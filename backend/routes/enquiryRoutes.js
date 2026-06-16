const express = require('express');
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');

const router = express.Router();

router.get('/', getEnquiries);
router.post('/', createEnquiry);

module.exports = router;