const express = require('express');
const { register, login, googleLogin, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes (require token)
router.use(verifyToken);
router.post('/change-password', changePassword);

module.exports = router;
