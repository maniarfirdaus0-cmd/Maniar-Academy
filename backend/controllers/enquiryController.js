const Enquiry = require('../models/Enquiry');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// GET all enquiries (Admin)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enquiries', error: error.message });
  }
};

// POST new enquiry (student)
const createEnquiry = async (req, res) => {
  try {
    const { studentName, email, phoneNumber, selectedCourse, message } = req.body;

    if (!studentName || !email || !phoneNumber || !selectedCourse) {
      return res.status(400).json({
        message: 'studentName, email, phoneNumber, and selectedCourse are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const enquiry = await Enquiry.create({
      studentName,
      email,
      phoneNumber,
      selectedCourse,
      message,
    });

    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to submit enquiry', error: error.message });
  }
};

module.exports = { getEnquiries, createEnquiry };