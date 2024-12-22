const express = require('express');
const router = express.Router();
const { Vet } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/vets
// @desc    Get all approved vets
// @access  Public
router.get('/', async (req, res) => {
  try {
    const vets = await Vet.find({ status: 'approved' }).sort({ date: -1 });
    res.json(vets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/vets
// @desc    Add a new vet
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, specialization, location, contact } = req.body;

    const newVet = new Vet({
      name,
      specialization,
      location,
      contact,
      status: 'pending'
    });

    const vet = await newVet.save();
    res.json(vet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
