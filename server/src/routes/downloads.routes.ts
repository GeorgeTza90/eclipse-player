import { Router } from "express";
import { createRateLimiter } from '@/middleware/rateLimiter.js';
import { downloadAPK, downloadDesktop } from "@/controllers/downloads.controller.js";

const router = Router();

// Rate limiters       
const downloadLimiter = createRateLimiter(60, 10);

// Public routes
router.get('/apk', downloadLimiter, downloadAPK);
router.get('/desktop', downloadLimiter, downloadDesktop);

export default router;