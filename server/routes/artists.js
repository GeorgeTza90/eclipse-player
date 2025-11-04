const express = require('express');
const { getAllArtists, getArtist } = require('../controllers/artistsController');

const router = express.Router();

// Public routes
router.get('/', getAllArtists);
router.get('/:name', getArtist);

module.exports = router;
