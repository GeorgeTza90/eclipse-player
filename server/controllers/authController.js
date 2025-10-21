const db = require('../db/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

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

// Login
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

// Google-Login
exports.googleLogin = async (req, res) => {
    res.status(501).json({ error: 'Google login not implemented yet' });
};
