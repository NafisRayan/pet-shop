const express = require('express');
const router = express.Router();
const { Event } = require('../services/mongodb');
const auth = require('../middleware/auth');

// @route   GET api/events
// @desc    Get all approved events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' })
      .populate('organizer', ['name'])
      .sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/events
// @desc    Create an event
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
      status: 'pending'
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
