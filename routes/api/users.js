const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//Models
const User = require('../../models/Users');

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
  (req, res) => {
    //variable to check the required items
    const errors = validationResult(req);

    //if the errors are not empty, return a 400 (bad request) with the error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = res.body;
    try {
      //see if user exists and the email isn't a duplicate
      //get the users gravatar
      //create new instance of a user
      //encrypt password
      //create a salt with bcrypt
      //save the user to the db
      //send a message that the user is registered
    } catch (error) {
      //console log the error
      //send a res of 500 with a server error message
    }
  }
);

module.exports = router;
