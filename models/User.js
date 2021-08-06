//high order constructor for the users for the schema-less MongoDB
const mongoose = require('mongoose');

//schema for user = name, email, password, avatar and date
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //not sure what to do about avatar at this point
  //keep it as a gravatar until later
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
