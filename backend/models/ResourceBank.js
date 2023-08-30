const mongoose = require('mongoose');

const resourceBankSchema = new mongoose.Schema({
  title: String,
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  type: {
    type: String,
    enum: ['private', 'public']
  },
  accessCode: String
});

const ResourceBank = mongoose.model('ResourceBank', resourceBankSchema);

module.exports = ResourceBank;
