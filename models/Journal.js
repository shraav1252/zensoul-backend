const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    mood: {
      type: String,
      required: [true, 'Mood is required'],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Journal', journalSchema);
