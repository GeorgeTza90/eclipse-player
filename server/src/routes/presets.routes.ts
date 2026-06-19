import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createRateLimiter }  from '../middleware/rateLimiter.js';
import { createPresets, deletePresets, getPresets, updatePresets } from "../controllers/presets.controller.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { createPresetSchema, deletePresetSchema, updatePresetSchema } from "../schemas/presets.schema.js";

const router = Router();

// Rate limiters (min/max)
const createPresetsLimiter = createRateLimiter(1, 30);
const updatePresetsLimiter = createRateLimiter(1, 30);
const deletePresetsLimiter = createRateLimiter(1, 30);

router.use(verifyToken);

// Presets CRUD
router.get("/", getPresets);
router.post("/", createPresetsLimiter, validateBody(createPresetSchema), createPresets);
router.put("/:id", updatePresetsLimiter, validateBody(updatePresetSchema), updatePresets);
router.delete("/:id", deletePresetsLimiter, validateParams(deletePresetSchema), deletePresets);

export default router;