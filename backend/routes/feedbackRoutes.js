const express = require('express');
const router = express.Router();
const {
  getFeedbacks,
  createFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
