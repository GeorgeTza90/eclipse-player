import { AppError } from "@/errors/AppError.js";
import type { ErrorCode } from "@/utils/httpErrorMap.js";

export class Ensure {
    static that(
        condition: boolean,
        errorCode: ErrorCode,
        statusCode: number,
    ): void {
        if (!condition) throw new AppError(errorCode, statusCode);
    }

    static exists<T>(
        value: T | null | undefined,
        code: ErrorCode,
        status = 404,
    ): asserts value is T {
        if (value == null) throw new AppError(code, status);
    }
}