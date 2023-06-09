const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
