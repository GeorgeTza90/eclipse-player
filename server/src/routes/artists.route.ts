import { Router } from 'express';
import { getAllArtists, getArtist } from '../controllers/artists.controller.js';
import { validateParams } from '../middleware/validate.js';
import { getArtistSchema } from '../schemas/artists.schema.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const router = Router()

// Rate limiters (min/max)
const getAllArtistsLimiter = createRateLimiter(1, 30);
const getArtistLimiter = createRateLimiter(1, 30);

// Public routes
router.get('/', getAllArtistsLimiter, getAllArtists);
router.get('/:name', getArtistLimiter, validateParams(getArtistSchema), getArtist);

export default router;
