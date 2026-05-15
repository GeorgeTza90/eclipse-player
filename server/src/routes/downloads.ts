import { Router } from "express";
import { createRateLimiter } from '../middleware/rateLimiter.js';
import { downloadAPK } from "../controllers/downloadsController.js";

const router = Router();

// Rate limiters       
const downloadLimiter = createRateLimiter(60, 10);

// Public routes
router.get('/apk', downloadLimiter, downloadAPK);

export default router;