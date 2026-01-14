import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
  to: string | string[],
  subject: string,
  html: string
): Promise<void> {
  try {
    const data = await resend.emails.send({
      from: "Eclipse Player <onboarding@eclipseplayer.com>",
      to,
      subject,
      html,
    });

    console.log('Email sent:', data);
  } catch (error: any) {
    console.error('Error sending email:', error.response?.data || error);
    throw error;
  }
}

export default sendEmail;
