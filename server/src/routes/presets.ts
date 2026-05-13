import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createRateLimiter }  from '../middleware/rateLimiter.js';
import { createPresets, deletePresets, getPresets, updatePresets } from "../controllers/presetsController.js";

const router = Router();

router.use(verifyToken);

// Rate limiters (min/max)
const createPresetsLimiter = createRateLimiter(1, 30);
const deletePresetsLimiter = createRateLimiter(1, 30);

// Presets CRUD
router.get("/", getPresets);
router.post("/", createPresetsLimiter,createPresets);
router.put("/:id", updatePresets);
router.delete("/:id", deletePresetsLimiter, deletePresets);

export default router;