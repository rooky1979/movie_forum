/* FILE THAT CREATES THE SERVER */

//bring in express
const express = require('express');

//bring in the DB connection
const connectDB = require('./config/db.js');

//path module
const path = require('path');

//initialise app variable with express
const app = express();

//call DB connection
connectDB();

//initialise middleware
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/discussions', require('./routes/api/discussions'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//setup the environment variable for local host or deployed server
const PORT = process.env.PORT || 5000;

//listen on a port and start the server
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
