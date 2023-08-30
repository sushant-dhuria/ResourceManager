const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: String,
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  resourceBanks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResourceBank' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
