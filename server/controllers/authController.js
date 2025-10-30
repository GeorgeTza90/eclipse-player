const db = require('../db/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET;
const RESET_SECRET = process.env.RESET_PASSWORD_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- Register ---
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters long' });

    try {        
        const [existingRows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingRows.length > 0) return res.status(400).json({ error: 'Email already in use' });                

        const hashedPassword = await bcrypt.hash(password, 10);        
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        const userId = result.insertId;        
        const [userRows] = await db.query('SELECT id, username, email, premium FROM users WHERE id = ?', [userId]);
        const user = userRows[0];        

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, premium: user.premium },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ user, token });
    } catch (err) {
        console.log('Server Error - on Register', err);
        res.status(500).json({ error: 'Ooops something went wrong. Please try again later.' });
    }
};

// --- Login ---
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    try {        
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });        

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });        

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, premium: user.premium },
            JWT_SECRET,
            { expiresIn: '7d' }
        );        

        const { id, username, premium } = user;
        res.json({ user: { id, username, email, premium }, token });
    } catch (err) {
        console.log('Server Error - on Login', err);
        res.status(500).json({ error: 'Ooops something went wrong. Please try again later.' });
    }
};

// --- Google Login ---
exports.googleLogin = async (req, res) => {
  const { idToken, platform } = req.body;
  if (!idToken) return res.status(400).json({ error: 'ID token is required' });
  if (!platform) return res.status(400).json({ error: 'Platform is required (web, android, ios)' });

  let clientId;
  switch (platform) {
    case 'web':
      clientId = process.env.GOOGLE_CLIENT_ID_WEB;
      break;
    case 'android':
      clientId = process.env.GOOGLE_CLIENT_ID_ANDROID;
      break;
    case 'ios':
      clientId = process.env.GOOGLE_CLIENT_ID_IOS;
      break;
    default:
      return res.status(400).json({ error: 'Invalid platform' });
  }

  try {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    const [rows] = await db.query('SELECT id, username, email, premium FROM users WHERE email = ?', [email]);
    let user;

    if (rows.length > 0) {
      user = rows[0];
    } else {
      const [result] = await db.query(
        'INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)',
        [name, email, googleId, null]
      );
      const userId = result.insertId;
      const [userRows] = await db.query('SELECT id, username, email, premium FROM users WHERE id = ?', [userId]);
      user = userRows[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, premium: user.premium },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(400).json({ error: 'Google login failed' });
  }
};

// --- Forgot Password ---
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const [rows] = await db.query('SELECT id, email, username FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.json({ message: 'If this email exists, a reset link has been sent' });
        }
        
        const resetToken = jwt.sign({ id: user.id, email: user.email }, RESET_SECRET, { expiresIn: '15m' });
        const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

        const html = `
            <h2>Password Reset Request</h2>
            <p>Hello ${user.username || ''},</p>
            <p>You requested to reset your password. Click the link below to reset it:</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
            <p>This link expires in 15 minutes.</p>
            <br/>
            <p>If you didn’t request this, you can safely ignore this email.</p>
        `;

        try {
            await sendEmail(user.email, 'Reset Your Password', html);
        } catch (emailErr) {
            console.error('Failed to send reset email:', emailErr);
        }

        return res.json({ message: 'If this email exists, a reset link has been sent' });
    } catch (err) {
        console.error('Server Error - on Forgot Password:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

// --- Change Password (logged-in users) ---
exports.changePassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Old and new passwords are required' });
    if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters long' });

    try {
        const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
        const user = rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Incorrect old password' });

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

// --- Reset Password ---
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required' });
    if (newPassword.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters long' });

    try {
        const decoded = jwt.verify(token, RESET_SECRET);
        const userId = decoded.id;

        const [rows] = await db.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (!rows[0]) return res.status(404).json({ error: 'User not found' });

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};
