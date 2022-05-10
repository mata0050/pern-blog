const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const {
  createUser,
  updateUserProfile,
} = require('../../controllers/registerController');

// Routes
router.post('/', createUser);
router.put('/', auth, updateUserProfile);

module.exports = router;
