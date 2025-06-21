const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// POST: Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const newEntry = new Journal({
      title: title?.trim(),
      content: content?.trim(),
      mood: mood?.trim()
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('❌ Create error:', err);
    res.status(400).json({ error: err.message || 'Error creating journal entry' });
  }
});

// GET: Fetch all journal entries
router.get('/', async (req, res) => {
  try {
    const entries = await Journal.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ error: 'Error fetching journal entries' });
  }
});

// DELETE: Delete a journal entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id.trim();
    const deletedEntry = await Journal.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Error deleting journal entry' });
  }
});

// PATCH: Update a journal entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { title, content, mood } = req.body;

    const updates = {};
    if (title?.trim()) updates.title = title.trim();
    if (content?.trim()) updates.content = content.trim();
    if (mood?.trim()) updates.mood = mood.trim();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updatedEntry = await Journal.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ error: err.message || 'Error updating journal entry' });
  }
});

module.exports = router;
