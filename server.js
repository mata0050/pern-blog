const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();


//Init Middleware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'))

// ROUTES
app.use('/auth', require('./routes/auth/auth'));
app.use('/auth/register', require('./routes/auth/register'));
app.use('/api/blog', require('./routes/api/blog'));




app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
