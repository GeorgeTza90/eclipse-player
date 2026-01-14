import { Router } from 'express';
import { getAllArtists, getArtist } from '../controllers/artistsController';

const router = Router();

// Public routes
router.get('/', getAllArtists);
router.get('/:name', getArtist);

export default router;
