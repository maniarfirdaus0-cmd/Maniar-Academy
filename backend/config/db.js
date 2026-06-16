const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI from .env.
 * Exits the process if the URI is missing or the connection fails.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    // mongoose.connect() opens a connection pool to your MongoDB cluster
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // stop the server — unsafe to run without DB
  }
};


module.exports = connectDB;