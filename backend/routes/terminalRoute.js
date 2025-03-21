const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Simple health check route for the terminal service
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Terminal service is running'
    });
});

// Route to initialize terminal connection
// This is just a placeholder as the actual connection happens via Socket.IO
router.post('/init', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Terminal initialization request received',
        instructions: 'Connect to the WebSocket server to establish a terminal session'
    });
});

module.exports = router;
