const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const { getProfile, loginUser } = require('../../controllers/authController');

// Connect to DB
const pool = require('../../config/db');

// Routes
router.get('/', auth, getProfile);
router.post('/', loginUser);


module.exports = router;
