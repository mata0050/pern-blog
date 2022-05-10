const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();


//Init Middleware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'))

// ROUTES
app.use('/auth', require('./routes/auth/auth'));
app.use('/auth/register', require('./routes/auth/register'));


// Serve static assets in production
if (process.env.NPM_CONFIG_PRODUCTION) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
