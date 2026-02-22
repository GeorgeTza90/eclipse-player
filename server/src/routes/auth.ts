import { Router } from "express";
import { register, login, logout, googleLogin, forgotPassword, resetPassword, changePassword, me } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';
import { createRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Rate limiters
const loginLimiter = createRateLimiter(1, 10);
const registerLimiter = createRateLimiter(10, 5);      
const forgotLimiter = createRateLimiter(15, 3);        
const resetLimiter = createRateLimiter(15, 3);         
const googleLimiter = createRateLimiter(5, 10);        

// Public routes
router.post('/login', loginLimiter, login);
router.post('/logout', logout)
router.post('/register', registerLimiter, register);
router.post('/google-login', googleLimiter, googleLogin);
router.post('/forgot-password', forgotLimiter, forgotPassword);
router.post('/reset-password', resetLimiter, resetPassword);

// Protected routes
router.use(verifyToken);

router.get('/me', me);
router.post('/change-password', createRateLimiter(5, 5), changePassword);

export default router;