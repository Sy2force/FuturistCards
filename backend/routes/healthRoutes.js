const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: mongoConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

module.exports = router;
