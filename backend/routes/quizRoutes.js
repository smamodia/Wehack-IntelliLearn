const express = require('express');
const { submitQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middleware/user_middleware');
const router = express.Router();

// Submit quiz
router.post('/submit-quiz', authMiddleware, submitQuiz);

module.exports = router;