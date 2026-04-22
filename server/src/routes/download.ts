import { Router } from "express";
import { createRateLimiter } from '../middleware/rateLimiter';
import { downloadAPK } from "../controllers/downloadController";

const router = Router();

// Rate limiters       
const downloadLimiter = createRateLimiter(60, 10);

// Public routes
router.get('/apk', downloadLimiter, downloadAPK);

export default router;