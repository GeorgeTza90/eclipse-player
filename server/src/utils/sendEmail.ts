import { Resend } from "resend";
import { logger } from "@/utils/logger.js";
import { RESEND_API_KEY } from "@/config/env.js";
import { ensureEmailSent } from "@/guards/sendEmail.guard.js";

const resend = new Resend(RESEND_API_KEY);

async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Eclipse Player <onboarding@eclipseplayer.com>",
      to,
      subject,
      html,
    });

    if (error) logger.error("Resend error", { subject, name: error.name, message: error.message });
    ensureEmailSent(error);

    logger.info("Email sent", { emailId: data?.id, subject });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Error sending email", { subject, error: message });
    throw error;
  }
}

export default sendEmail;
