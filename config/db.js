/* FILE TO CONNECT TO THE MONGO DB*/

//bring in mongoose
const mongoose = require('mongoose');

//bring in config for global variables
const config = require('config');

//get the DB string from default.json
const db = config.get('mongoURI');

//connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

//export the db connection
module.exports = connectDB;
