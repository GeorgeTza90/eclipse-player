import 'dotenv/config';
import { Resend } from 'resend';
import { logger } from './logger.js';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
    try {
        const data = await resend.emails.send({
            from: "Eclipse Player <onboarding@eclipseplayer.com>",
            to,
            subject,
            html,
        });
        logger.info("Email sent", { emailId: data.data?.id, subject });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        logger.error("Error sending email", { subject, error: message });
        throw error;
    }
}

export default sendEmail;