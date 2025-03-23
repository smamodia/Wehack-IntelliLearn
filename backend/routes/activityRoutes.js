const express = require('express');
const { logActivity } = require('../controllers/activityController');
const authMiddleware = require('../middleware/user_middleware');
const router = express.Router();

// Log activity (e.g., completed quiz, watched video)
router.post('/activity', authMiddleware, logActivity);

module.exports = router;