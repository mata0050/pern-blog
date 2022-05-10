const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');

// connect DB
const pool = require('../../config/db');

const {
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
} = require('../../controllers/commentController');

// @route    GET /api/comment/:id
// @desc     GET all the comment for a specific blog
// @access   Public
router.get('/:id',  getAllComments);

// @route    POST /api/comment
// @desc     POST Create a comment
// @access   Private
router.post('/', auth, addComment);

// @route    PUT /api/comment
// @desc     PUT Update a comment
// @access   Private
router.put('/', auth, updateComment);

// @route    DELETE /api/comment/:id
// @desc     DELETE  a comment
// @access   Private
router.delete('/:id', auth, deleteComment);


module.exports = router;
