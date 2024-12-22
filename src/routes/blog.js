const express = require('express');
const router = express.Router();
const { BlogPost } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/blog
// @desc    Get all approved blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'approved' })
      .populate('author', ['name'])
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/blog
// @desc    Create a blog post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new BlogPost({
      title,
      content,
      author: req.user.id,
      status: 'pending'
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
