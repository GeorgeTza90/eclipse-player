import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export function createRateLimiter(minutes: number, max: number): RateLimitRequestHandler {
    return rateLimit({
        windowMs: minutes * 60 * 1000,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            error: "Too many requests. Try again later.",
        },
    });
}
