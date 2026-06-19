import { Router } from "express";
import { register, login, logout, googleLogin, forgotPassword, resetPassword, changePassword, updateUsername, me } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from "../middleware/validate.js";
import { loginSchema, googleLoginSchema, registerSchema, changePasswordSchema, resetPasswordSchema, updateUsernameSchema, forgotPasswordSchema } from "../schemas/auth.schemas.js";

const router = Router();

// Rate limiters (min/max)
const loginLimiter = createRateLimiter(1, 10);
const registerLimiter = createRateLimiter(10, 5);
const forgotLimiter = createRateLimiter(15, 3);
const googleLimiter = createRateLimiter(15, 10);
const changePassLimiter = createRateLimiter(5, 5);
const resetLimiter = createRateLimiter(30, 3);
const updateUsernameLimiter = createRateLimiter(3, 15);

// Public routes
router.post('/login', loginLimiter, validateBody(loginSchema), login);
router.post('/register', registerLimiter, validateBody(registerSchema), register);
router.post('/google-login', googleLimiter, validateBody(googleLoginSchema), googleLogin);
router.post('/forgot-password', forgotLimiter, validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', resetLimiter, validateBody(resetPasswordSchema), resetPassword);

// Protected routes
router.use(verifyToken);

router.get('/me', me);
router.post('/logout', logout);
router.post('/change-password', changePassLimiter, validateBody(changePasswordSchema), changePassword);
router.post('/update-username', updateUsernameLimiter, validateBody(updateUsernameSchema), updateUsername);

export default router;