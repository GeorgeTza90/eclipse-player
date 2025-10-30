require('dotenv').config();
const sendEmail = require('./sendEmail');

(async () => {
  try {
    await sendEmail(
      'gtzahristas@gmail.com',
      'Test Email from Eclipse Player',
      '<h1>Hello!</h1><p>This is a test email from your Node server 🚀</p>'
    );
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
})();
