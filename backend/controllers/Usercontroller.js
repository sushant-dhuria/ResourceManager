// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user and set a cookie
async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    
    // Set a cookie for the user
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}

// User login and set a cookie
async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    // Set a cookie for the user
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });
    
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user', error });
  }
}

module.exports = { register, login };
