import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

/**
 * Create a rate limiter middleware for Express
 * @param minutes Number of minutes for the window
 * @param max Maximum number of requests allowed in the window
 * @returns Express middleware function
 */
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
