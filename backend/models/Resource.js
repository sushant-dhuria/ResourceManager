const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  content: String,
  url:String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resourceBank: { type: mongoose.Schema.Types.ObjectId, ref: 'ResourceBank' },
  isPrivate: String
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
