const User = require('../model/User');

const logActivity = async (req, res) => {
  const { courseId, activityType, details } = req.body;
  const userId = req.user.userId;

  const user = await User.findById(userId);
  user.activity.push({ activityType, details });
  await user.save();
  res.status(200).json({ message: 'Activity logged successfully' });
};

module.exports = { logActivity };