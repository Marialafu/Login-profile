const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
