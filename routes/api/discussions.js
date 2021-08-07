const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const Discussion = require('../../models/Discussion');
const Profile = require('../../models/Profile');

//@route    Post api/discussions
//@desc     Create a discussion
//@access   Private

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newDiscussion = new Discussion({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const discussion = await newDiscussion.save();
      res.json(discussion);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    GET api/discussions
//@desc     Get all discussions
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    //get all discussions and sort by most recent date (-1)
    const discussions = await Discussion.find().sort({ date: -1 });
    res.json(discussions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/discussions/:id
//@desc     Get a single discussion post
//@access   Private

router.get('/:id', auth, async (req, res) => {
  try {
    //get a single discussion by ID
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }

    res.json(discussion);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/discussions
//@desc     Get a single discussion post
//@access   Private

router.delete('/:id', auth, async (req, res) => {
  try {
    //get a single discussion by ID
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    if (discussion.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorised to delete this discussion' });
    }
    await discussion.remove();

    res.json({ msg: 'Discussion Removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Discussion not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
