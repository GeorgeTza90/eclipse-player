require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const data = await resend.emails.send({
      from: "Eclipse Player <onboarding@eclipseplayer.com>",
      to,
      subject,
      html,
    });

    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error);
    throw error;
  }
}

module.exports = sendEmail;