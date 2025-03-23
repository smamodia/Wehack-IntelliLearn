const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    credentials: true, // Allow cookies and credentials
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Mock data
const quizzes = require('./quizzes.json');
const questions = require('./questions.json');

// Route to fetch quiz data
app.get('/api/quizzes/:quizId', (req, res) => {
  const quizId = req.params.quizId;
  const quiz = quizzes.find((q) => q.quiz_id === quizId);

  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  res.json(quiz);
});

// Route to fetch quiz questions
app.get('/api/quizzes/:quizId/questions', (req, res) => {
  const quizId = req.params.quizId;
  const quizQuestions = questions.find((q) => q.quiz_id === quizId)?.questions || [];

  if (!quizQuestions.length) {
    return res.status(404).json({ message: 'No questions found for this quiz' });
  }

  res.json(quizQuestions);
});

// Route to submit quiz answers
app.post('/api/quizzes/:quizId/submit', (req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = req.body;

  // Validate user answers (mock logic)
  const quizQuestions = questions.find((q) => q.quiz_id === quizId)?.questions || [];
  const results = quizQuestions.map((q) => ({
    questionId: q.id,
    correct: userAnswers[q.id] === q.correctAnswer,
  }));

  res.json({ results });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});