import type { ErrorCode } from "../utils/httpErrorMap.js";

export class AppError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(message: ErrorCode, statusCode = 500, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}