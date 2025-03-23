const express = require('express');
const { enrollCourse, updateProgress } = require('../controllers/courseController');
const authMiddleware = require('../middleware/user_middleware');
const router = express.Router();

// Enroll in a course
router.post('/enroll', authMiddleware, enrollCourse);

// Update progress (completed materials, quizzes, etc.)
router.post('/progress', authMiddleware, updateProgress);

module.exports = router;