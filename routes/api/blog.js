const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');

// connect DB
const pool = require('../../config/db');

const {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} = require('../../controllers/blogController');

// @route    GET /api/blog
// @desc     GET all the blogs
// @access   Public
router.get('/', getAllBlogs);

// @route    POST /api/blog
// @desc     POST Create a blog
// @access   Private
router.post('/', auth, addBlog);

// @route    PUT /api/blog
// @desc     PUT Update a blog
// @access   Private
router.put('/', auth, updateBlog);

// @route    DELETE /api/blog/:id
// @desc     DELETE  a blog
// @access   Private
router.delete('/:id', auth, deleteBlog);


module.exports = router;
