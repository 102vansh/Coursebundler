
const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createInterview, getInterview, getInterviews, submitInterview, deleteInterview } = require('../controllers/interviewController');
const router = express.Router();






// Create a new interview
router.post('/create', isAuthenticated,createInterview);

// Get all interviews for a user
router.get('/getll',isAuthenticated,getInterviews);

// Get a specific interview
router.get('/getint:id',isAuthenticated,getInterview);

// Submit interview answers
router.post('submit/:id/submit',isAuthenticated,submitInterview);

// Delete an interview
router.delete('deleteint/:id', isAuthenticated,deleteInterview);

module.exports = router;