import type { ErrorResponse } from "resend";
import { Ensure } from "@/utils/ensure.js";

export function ensureEmailSent(error: ErrorResponse | null): asserts error is null {
    Ensure.that(error === null, "EMAIL_SEND_FAILED", 502);
}