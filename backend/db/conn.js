const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://28vanshjain:vansh%402002@kohina1.ujlok.mongodb.net/?retryWrites=true&w=majority&appName=kohina1';
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // Reduced timeout for faster feedback
      connectTimeoutMS: 10000,
    });
    mongoose.set('debug', true);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    // Don't exit the process to allow the terminal feature to work even if DB is down
    console.log('Continuing without database connection...');
  }
};

module.exports = connectDB;