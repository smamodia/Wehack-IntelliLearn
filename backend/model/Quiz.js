const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  time_required_minutes: { type: Number, required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);