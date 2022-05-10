const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// connect DB
const pool = require('../config/db');

// @route    POST /register
// @desc     Register a user
// @access   Public
const createUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error('Please enter First Name, Last Name, Email & password');
  }
  // check to see if user exists
  const queryString = 'SELECT * FROM users WHERE email= $1';
  const results = await pool.query(queryString, [email]);

  if (results.rows.length !== 0) {
    res.status(400);
    throw new Error('User already exists');
  }

  let user = {
    email: email.toLowerCase(),
    first_name: first_name,
    last_name: last_name,
    password,
    created_at: new Date(),
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Insert into the database
  const values = [
    user.email,
    user.first_name,
    user.last_name,
    user.password,
    user.created_at,
  ];

  const insertResult = await pool.query(
    'INSERT INTO users( email, first_name, last_name, password, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values
  );

  // checks to see if users has been added to db
  if (insertResult.rows.length !== 1) {
    res.status(500);
    throw new Error('Server error, try registering again');
  }

  const payload = {
    user: {
      id: insertResult.rows[0].id,
      ...user,
    },
  };

  // change back to 3600 before deploy
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        userProfile: {
          id: insertResult.rows[0].id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
        },
      });
    }
  );
});

// @route    PUT /register
// @desc     UPDATE a user
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, newPassword } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(400);
    throw new Error('Please enter First Name, Last Name & Email');
  }
  // check to see if user exists
  const queryString = 'SELECT * FROM users WHERE email= $1';
  const results = await pool.query(queryString, [email]);

  if (results.rows.length === 0) {
    res.status(400);
    throw new Error('Error Updating Profile');
  }

  // compare password
  if (password !== undefined) {
    const isMatch = await bcrypt.compare(password, results.rows[0].password);

    if (!isMatch) {
      res.status(400);
      throw new Error('Wrong Password');
    }
  }

  let user = {
    email: results.rows[0].email,
    first_name: results.rows[0].first_name,
    last_name: results.rows[0].last_name,
    password: results.rows[0].password,
  };

  if (password !== undefined && newPassword !== undefined) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
  }

  // // Insert into the database
  const values = [
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    user.email,
  ];
  
  const { rows } = await pool.query(
    'UPDATE users SET  first_name=$1, last_name=$2, email=$3, password=$4 WHERE email= $5 RETURNING *',
    values
  );

  const result = [
    {
      id: rows[0].id,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      email: rows[0].email,
    },
  ];

  res.json(result);
});

module.exports = {
  createUser,
  updateUserProfile,
};
