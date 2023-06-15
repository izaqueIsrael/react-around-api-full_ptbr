/* eslint-disable prefer-regex-literals */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.statics.findUserByCredentials = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos' });
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
          }

          req.user = user;
          return next();
        })
        .catch((error) => {
          res.status(500).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

module.exports = mongoose.model('user', userSchema);
