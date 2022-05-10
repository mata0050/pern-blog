const asyncHandler = require('express-async-handler');

// connect DB
const pool = require('../config/db');

// @route    GET /api/comment/:id
// @desc     GET all the comment for a specific blog
// @access   Public
const getAllComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    'SELECT * from comments WHERE blog_id = $1',
    [id]
  );
  res.json(rows);
});

// @route    POST /api/comment
// @desc     POST Create a comment
// @access   Private
const addComment = asyncHandler(async (req, res) => {
  const { user_id, comment } = req.body;
  const created_at = new Date();

  if (!user_id || !comment) {
    res.status(400);
    throw new Error('Error Creating, Please try again');
  }

  const { rows } = await pool.query(
    'INSERT INTO comments(user_id, comment, created_at) VALUES( $1, $2, $3) RETURNING *',
    [user_id, comment, created_at]
  );

  res.json(rows);
});

// @route    PUT /api/comment
// @desc     PUT Update a comment
// @access   Private
const updateComment = asyncHandler(async (req, res) => {
  const { user_id, comment } = req.body;
  const updated_at = new Date();

  if (!user_id || !comment) {
    res.status(400);
    throw new Error('Error updating, Please try again');
  }

  const { rows } = await pool.query(
    'UPDATE comments SET  comment = $1, updated_at = $2 WHERE user_id = $3 RETURNING *',
    [comment, updated_at, user_id]
  );

  res.json(rows);
});

// @route    DELETE /api/comment/:id
// @desc     DELETE  a comment
// @access   Private
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM comments WHERE id = $1', [id]);

  res.json({ msg: 'Delete was successful' });
});

module.exports = {
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
};
