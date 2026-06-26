import { AppError } from "../errors/AppError.js";

export class Ensure {
    static that(
        condition: boolean,
        errorCode: string,
        statusCode: number,
    ): void {
        if (!condition) throw new AppError(errorCode, statusCode);
    }

    static exists<T>(
        value: T | null | undefined,
        code: string,
        status = 404,
    ): asserts value is T {
        if (value == null) throw new AppError(code, status);
    }
}