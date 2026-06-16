const Feedback = require('../models/Feedback');

// @desc    Get all student feedbacks
// @route   GET /api/feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Submit student feedback
// @route   POST /api/feedbacks
const createFeedback = async (req, res) => {
  try {
    const { name, course, rating, quote, accent } = req.body;

    if (!name || !course || !quote) {
      return res.status(400).json({ message: 'Name, course, and quote are required' });
    }

    const newFeedback = new Feedback({
      name,
      course,
      rating: rating || 5,
      quote,
      accent: accent || 'border-slate-500/20'
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: 'Validation Error', error: error.message });
  }
};

// @desc    Delete feedback (Admin)
// @route   DELETE /api/feedbacks/:id
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getFeedbacks,
  createFeedback,
  deleteFeedback
};
