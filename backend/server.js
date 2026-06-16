require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB before handling requests
connectDB();

// cors() allows React frontend to communicate with this API
app.use(cors({
  origin: [
    'https://maniar-academy.vercel.app', // Your live Vercel domain
    'http://localhost:5173'             // Keep this for local testing
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// express.json() parses incoming JSON request bodies
app.use(express.json());

const courseRoutes = require('./routes/courseRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Simple health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Maniar Academy API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});