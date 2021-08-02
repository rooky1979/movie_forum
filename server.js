/* FILE THAT CREATES THE SERVER */

//bring in express
const express = require('express');

//bring in the DB connection
const connectDB = require('./config/db.js');

//initialise app variable with express
const app = express();

//call DB connection
connectDB();

//single end point to test and send something to the browser
app.get('/', (req, res) => res.send('API Running'));

//setup the environment variable for local host or deployed server
const PORT = process.env.PORT || 5000;

//listen on a port and start the server
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
