const express = require('express');
const router = express.Router();
const { Pet } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/pets
// @desc    Get all pets
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ date: -1 });
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/pets
// @desc    Add new pet
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, breed, age, description, images } = req.body;

    const newPet = new Pet({
      name,
      type,
      breed,
      age,
      description,
      images,
      owner: req.user.id
    });

    const pet = await newPet.save();
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
