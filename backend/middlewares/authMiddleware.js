// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  jwt.verify(token, 'secret_key', (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
}

module.exports = authenticateToken;
