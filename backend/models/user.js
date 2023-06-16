/* eslint-disable prefer-regex-literals */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Othmar Garithos',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Grand Marshal',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return RegExp(/^(http|https):\/\/[^ ']+$/).test(v);
      },
      message: 'Invalid Image URL',
    },
    default: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSWBYluU0y_MFjG98dnnyhLNHH3glMomdYAaIG9whVRy-hWi4p',
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Invalid email format',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
