const User = require('../model/User');

const enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    user.progress.push({ courseId, completedMaterials: [], completedTests: 0, weakAreas: [] });
    await user.save();
  }
  res.status(200).json({ message: 'Enrolled in course successfully' });
};

const updateProgress = async (req, res) => {
  const { courseId, materialId, quizId, score, totalQuestions } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  const courseProgress = user.progress.find((p) => p.courseId.toString() === courseId);

  if (materialId) {
    if (!courseProgress.completedMaterials.includes(materialId)) {
      courseProgress.completedMaterials.push(materialId);
    }
  }

  if (quizId && score !== undefined) {
    const middleScore = totalQuestions / 2;
    if (score < middleScore) {
      const quiz = await Quiz.findById(quizId);
      if (quiz && !courseProgress.weakAreas.includes(quiz.title)) {
        courseProgress.weakAreas.push(quiz.title);
      }
    }
    courseProgress.completedTests += 1;
  }

  await user.save();
  res.status(200).json({ message: 'Progress updated successfully' });
};

module.exports = { enrollCourse, updateProgress };