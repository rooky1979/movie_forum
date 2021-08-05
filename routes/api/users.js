const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//Models
const User = require('../../models/User');

//@route    POST api/users
//@desc     Register User
//@access   Public

router.post(
  '/',
  [
    //check name is not empty
    check('name', 'Name is required').not().isEmpty(),
    //check email is an email
    check('email', 'Please enter a valid email').isEmail(),
    //check password has more than 6 characters
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //variable to check the required items
    const errors = validationResult(req);

    //if the errors are not empty, return a 400 (bad request) with the error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //see if user exists and the email isn't a duplicate
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //get the users gravatar
      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //default is a plain profile icon
      });
      //create new instance of a user
      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //encrypt password
      //create a salt with bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save the user to the db
      await user.save();
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
