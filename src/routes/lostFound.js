const express = require('express');
const router = express.Router();
const { LostFound } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/lost-found
// @desc    Get all lost and found posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await LostFound.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/lost-found
// @desc    Create a lost/found post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { type, petType, description, location, images } = req.body;

    const newPost = new LostFound({
      type,
      petType,
      description,
      location,
      images,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
