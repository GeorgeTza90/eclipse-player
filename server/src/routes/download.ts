import { Router } from "express";
import { createRateLimiter } from '../middleware/rateLimiter';
import { downloadAPK } from "../controllers/downloadController";

const router = Router();

// Rate limiters       
const downloadLimiter = createRateLimiter(15, 3);         

// Public routes
router.get('/apk', downloadLimiter, downloadAPK);

export default router;