const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { generateQuiz } = require('../controllers/quizcontroller');
const router = express.Router();

router.route('/genquiz').post(isAuthenticated,generateQuiz);

module.exports = router;