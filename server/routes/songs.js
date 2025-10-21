const express = require('express');
const { getSongs } = require('../controllers/playerController');
const router = express.Router();

router.get('/', getSongs);

module.exports = router;
