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

//@route    PUT api/discussions/like/:id
//@desc     Like a discussion post
//@access   Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (
      discussion.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Discussion already liked' });
    }

    //unshift pushes the like onto the array
    discussion.likes.unshift({ user: req.user.id });

    await discussion.save();
    res.json(discussion.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    PUT api/discussions/unlike/:id
//@desc     Unlike a discussion post
//@access   Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (
      discussion.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Discussion has not yet been liked' });
    }

    //find the index of the like
    const removeIndex = discussion.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    discussion.likes.splice(removeIndex, 1);

    await discussion.save();
    res.json(discussion.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    Post api/discussions/comment/:id
//@desc     Comment on a discussion
//@access   Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const discussion = await Discussion.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      discussion.comments.unshift(newComment);

      await discussion.save();

      res.json(discussion.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    DELETE api/discussions/comment/:discussion_id/:comment_id
//@desc     Delete a comment
//@access   Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    const comment = discussion.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    //check comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    //check the user is the author of the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorised to delete comment' });
    }
    const removeIndex = discussion.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    discussion.comments.splice(removeIndex, 1);

    await discussion.save();
    res.json(discussion.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
