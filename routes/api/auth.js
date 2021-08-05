const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route    GET api/auth
//@desc     Test auth route
//@access   Public

router.get('/', auth, async (req, res) => {
  try {
    //find user by id but don't return the password
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/users
//@desc     Authenticate user and get token
//@access   Public

router.post(
  '/',
  [
    //check email is an email
    check('email', 'Please enter a valid email').isEmail(),
    //check password has more than 6 characters
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //variable to check the required items
    const errors = validationResult(req);

    //if the errors are not empty, return a 400 (bad request) with the error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //see if user exists and the email isn't a duplicate
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid password or email' }] });
      }
      //check the password entered matches the user saved passwprd
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password or email' });
      }
      //get the user id as an object
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      //console log the error
      console.error(error.message);
      //send a res of 500 with a server error message
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
