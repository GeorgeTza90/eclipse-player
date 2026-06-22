import { Router } from "express";
import { getSongs, getPrivateSongs } from "../controllers/songs.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Rate limiters (min/max)
const getSongsLimiter = createRateLimiter(1, 30);
const getPrivateSongsLimiter = createRateLimiter(1, 30);

// Public routes
router.get("/", getSongsLimiter, getSongs);

// Protected routes
router.use(verifyToken)
router.get("/private", getPrivateSongsLimiter, getPrivateSongs);

export default router;
