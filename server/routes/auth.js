const express = require('express');
const { register, login, googleLogin, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { createRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rate limiters
const loginLimiter = createRateLimiter(1, 10);          // 10 / min
const registerLimiter = createRateLimiter(10, 5);       // 5 / 10 min
const forgotLimiter = createRateLimiter(15, 3);         // 3 / 15 min
const resetLimiter = createRateLimiter(15, 3);          // 3 / 15 min
const googleLimiter = createRateLimiter(5, 10);         // 10 / 5 min

// Public routes
router.post('/login', loginLimiter, login);
router.post('/register', registerLimiter, register);
router.post('/google-login', googleLimiter, googleLogin);
router.post('/forgot-password', forgotLimiter, forgotPassword);
router.post('/reset-password', resetLimiter, resetPassword);

// Protected routes (require token)
router.use(verifyToken);
router.post('/change-password', createRateLimiter(5, 5), changePassword);

module.exports = router;
