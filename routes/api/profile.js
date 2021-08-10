const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET api/profile
//@desc     GET the current user's profile
//@access   Private

router.get('/me', auth, async (req, res) => {
  try {
    //find the profile by user id
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    //check if there's a profile
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/profile
//@desc     Create or update the user profile
//@access   Private

router.post(
  '/',
  auth,
  [
    check(
      'favouritefilms',
      'Name some of your favourite films for your profile!!!'
    )
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    //check that required fields are populated
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //pull out the relevant profile fields
    const {
      location,
      bio,
      favouritegenres,
      favouritefilms,
      favouritedirectors,
      favouriteactors,
      youtube,
      facebook,
      instagram,
      twitter,
    } = req.body;
    //empty profileField object
    const profileFields = {};
    //make the object the current user
    profileFields.user = req.user.id;
    //check if the field has a value, if so set it to that value
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    //arrays are separated by a comma. The array is split and trimmed and added to the array
    if (favouritegenres) {
      profileFields.favouritegenres = favouritegenres
        .split(',')
        .map((skill) => skill.trim());
    }
    if (favouritefilms) {
      profileFields.favouritefilms = favouritefilms
        .split(',')
        .map((skill) => skill.trim());
    }
    if (favouritedirectors) {
      profileFields.favouritedirectors = favouritedirectors
        .split(',')
        .map((skill) => skill.trim());
    }
    if (favouriteactors) {
      profileFields.favouriteactors = favouriteactors
        .split(',')
        .map((skill) => skill.trim());
    }
    //object for the social media fields
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //update the profile if one is found
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create a profile if none are found
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
    console.log(profileFields.social.twitter);
    res.send('Profile updated/created');
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get a profile by user id
//@access   Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json('Profile not found!');
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json('Profile not found');
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/profile
//@desc     Delete profile, users and posts
//@access   Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove users posts

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user._id });
    res.json('User Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET /movies
//@desc GET OMDB film info
//@access Private

router.get('/movies', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const films = Promise.all(
      profile.favouritefilms.map((film) =>
        axios.get(
          `http://www.omdbapi.com/?t=${film}&apikey=${config.get('OMDBkey')}`
        )
      )
    ).then((films) => res.json(films.map((film) => film.data)));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
