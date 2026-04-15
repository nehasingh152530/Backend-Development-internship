const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('../config/db');
const getLogger = require('../utils/logger');
const errorHandler = require('../middleware/errorHandlers');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB().catch(err => console.error('Initial DB Connection Error:', err.message));

const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Basic logging
app.use(getLogger());

// Mount routers
app.get('/', (req, res) => res.send('Task Management API is running...'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
