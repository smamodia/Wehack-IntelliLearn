const User = require('../model/User');
const Quiz = require('../model/Quiz');

const submitQuiz = async (req, res) => {
  const { courseId, quizId, score, totalQuestions } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  const courseProgress = user.progress.find((p) => p.courseId.toString() === courseId);

  const middleScore = totalQuestions / 2;
  if (score < middleScore) {
    const quiz = await Quiz.findById(quizId);
    if (quiz && !courseProgress.weakAreas.includes(quiz.title)) {
      courseProgress.weakAreas.push(quiz.title);
    }
  }
  courseProgress.completedTests += 1;

  await user.save();
  res.status(200).json({ message: 'Quiz submitted successfully', score });
};

module.exports = { submitQuiz };