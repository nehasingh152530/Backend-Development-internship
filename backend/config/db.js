const mongoose = require('mongoose');

// Use a variable to cache the connection status
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = !!conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // In serverless, we might not want to exit the process, 
    // but for debugging it's helpful.
    throw error;
  }
};

module.exports = connectDB;

