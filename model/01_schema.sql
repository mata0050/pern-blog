DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS blog CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

-- USER TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP, 
  updated_at TIMESTAMP
);

-- BLOG TABLE
CREATE TABLE blog (
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INTEGER REFERENCES users(id),
  blog TEXT NOT NULL,
  created_at TIMESTAMP, 
  updated_at TIMESTAMP
);


-- PRODUCT TABLE
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  blog_id INTEGER REFERENCES blog(id),
  user_id INTEGER REFERENCES users(id),
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP, 
  updated_at TIMESTAMP
);
