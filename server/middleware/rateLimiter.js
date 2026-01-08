const rateLimit = require('express-rate-limit');

/** 
 * @param {number} minutes
 * @param {number} max
 */

function createRateLimiter(minutes, max) {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests. Try again later.',
    },
  });
}

module.exports = { createRateLimiter };
