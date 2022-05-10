const asyncHandler = require('express-async-handler');

// connect DB
const pool = require('../config/db');

/// @route    GET /api/blog
// @desc     GET all the blogs
// @access   Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * from blog');
  res.json(rows);
});

// @route    POST /api/blog
// @desc     POST Create a blog
// @access   Private
const addBlog = asyncHandler(async (req, res) => {
  const { author_id, blog } = req.body;
  const created_at = new Date();

  if (!author_id || !blog) {
    res.status(400);
    throw new Error('Error Creating, Please try again');
  }

  const { rows } = await pool.query(
    'INSERT INTO blog(author_id, blog, created_at) VALUES( $1, $2, $3) RETURNING *',
    [author_id, blog, created_at]
  );

  res.json(rows);
});

// @route    PUT /api/blog
// @desc     PUT Update a blog
// @access   Private
const updateBlog = asyncHandler(async (req, res) => {
  const { id, blog } = req.body;
  const updated_at = new Date();

  if (!id || !blog) {
    res.status(400);
    throw new Error('Error updating, Please try again');
  }

  const { rows } = await pool.query(
    'UPDATE blog SET  blog = $1, updated_at = $2 WHERE id = $3 RETURNING *',
    [blog, updated_at, id]
  );

  res.json(rows);
});

// @route    DELETE /api/blog/:id
// @desc     DELETE  a blog
// @access   Private
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM blog WHERE id = $1', [id]);

  res.json({ msg: 'Delete was successful' });
});

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
