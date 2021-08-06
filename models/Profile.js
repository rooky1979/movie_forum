const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  favouritegenres: {
    type: [String],
  },
  //array CSV that will make a request to the movieAPI to get the film information
  favouritefilms: {
    type: [String],
    required: true,
  },
  favouriteactors: {
    //can actor profiles be shown?
    type: [String],
  },
  favouritedirectors: {
    //can director profiles be shown?
    type: [String],
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
