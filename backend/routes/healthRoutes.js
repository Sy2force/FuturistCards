const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  const connectionStates = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: mongoConnected ? 'connected' : 'disconnected',
    mongoState: connectionStates[mongoose.connection.readyState] || 'unknown',
    database: mongoose.connection.name || 'none',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

module.exports = router;
