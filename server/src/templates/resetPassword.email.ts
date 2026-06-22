import { escapeHtml } from "../utils/escapeHtml.js";

export function resetEmailHtml(username: string, resetLink: string, minEXP: number) {
    const html = `
        <h2>Password Reset Request</h2>
        <p>Hello ${escapeHtml(username || "")},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>This link expires in ${minEXP} minutes.</p>
        <br/>
        <p>If you didn’t request this, you can ignore this email.</p>
    `;
    return html;
}