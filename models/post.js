const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);