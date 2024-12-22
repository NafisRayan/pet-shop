const express = require('express');
const router = express.Router();
const { Adoption } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/adoptions
// @desc    Get user's adoption requests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user.id })
      .populate('pet')
      .sort({ date: -1 });
    res.json(adoptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/adoptions
// @desc    Create an adoption request
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { petId, message } = req.body;

    const newAdoption = new Adoption({
      pet: petId,
      user: req.user.id,
      message,
      status: 'pending'
    });

    const adoption = await newAdoption.save();
    res.json(adoption);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
