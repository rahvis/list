const express = require('express');
const router = express.Router();
const House = require('../models/House');

// Get all houses
router.get('/', async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new house listing
router.post('/', async (req, res) => {
  const house = new House(req.body);
  try {
    const newHouse = await house.save();
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a house listing
router.patch('/:id', async (req, res) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a house listing
router.delete('/:id', async (req, res) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    res.json({ message: 'House listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

