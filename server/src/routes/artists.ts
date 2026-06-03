import { Router } from 'express';
import { getAllArtists, getArtist } from '../controllers/artistsController.js';
import { validateParams } from '../middleware/validate.js';
import { getArtistSchema } from '../schemas/artists.schema.js';

const router = Router();

// Public routes
router.get('/', getAllArtists);
router.get('/:name', validateParams(getArtistSchema), getArtist);

export default router;
