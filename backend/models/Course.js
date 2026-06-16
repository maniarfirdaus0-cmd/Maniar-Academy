const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    accent: {
      type: String,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    syllabus: {
      type: [String],
      default: [],
    },
    perks: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);