const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// connect DB
const pool = require('../config/db');

// @route    GET /auth
// @desc     Get user by token
// @access   Private
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const queryString =
    'SELECT id, email, first_name, last_name FROM users WHERE id = $1';
  const { rows } = await pool.query(queryString, [id]);

  res.status(200).json(rows);
});

// @route    POST /
// @desc     Login User - get user profile & get token
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter your email and password');
  }
  // checking the email if it exists in db
  const queryString =
    'SELECT id, email, first_name, last_name,password FROM users WHERE email=$1';

  const { rows } = await pool.query(queryString, [email]);
  const user = rows;
  if (user.length === 0) {
    res.status(400);
    throw new Error('Invalid Credentials');
  }


  // compare passwords
  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid Credentials');
  }

  const payload = {
    user: {
      ...user[0],
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '5 days' },
    (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    }
  );
});

module.exports = {
  getProfile,
  loginUser,
};
