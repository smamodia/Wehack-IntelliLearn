const jwt = require('jsonwebtoken');

// Middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'secret_key'); // Replace 'secret_key' with your actual secret key

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid, return an error
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;