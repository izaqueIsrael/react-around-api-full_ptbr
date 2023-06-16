const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const NotAllowed = require('../errors/NOT_ALLOWED');
const NotFound = require('../errors/NOT_FOUND');
const NotModified = require('../errors/NOT_MODIFIED');
const ServerError = require('../errors/SERVER_ERROR');

dotenv.config();
const { JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((users) => res.status(201).send(users))
    .catch(() => next(new NotFound('Server Error')));
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new NotModified('Usuário já cadastrado'));
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      User.create({
        _id: new mongoose.Types.ObjectId(),
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => res.status(201).send({ user }))
    .catch(() => next(new ServerError('Server Error')));
};

const changeProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;
  try {
    User.findByIdAndUpdate(userId, { name, about }, { new: true })
      .orFail()
      .then((user) => res.status(201).send({ user }))
      .catch(() => next(new NotFound('User Not Found')));
  } catch (error) {
    next(new ServerError('Server Error'));
  }
};

const changeAvatar = (req, res, next) => {
  const { userId } = req.user;
  const { avatar } = req.body;
  try {
    User.findByIdAndUpdate(userId, { avatar }, { new: true })
      .orFail()
      .then((user) => res.status(201).send({ user }))
      .catch(() => next(new NotFound('User Not Found')));
  } catch (error) {
    next(new ServerError('Server Error'));
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new NotFound('Not Found'));
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return next(new NotFound('Not Found'));
          }

          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '12h' });

          return res.status(200).json({ token });
        });
    })
    .catch(() => next(new ServerError('Server Error')));
};

const checkToken = (req, res, next) => {
  const { userId } = req.user;
  try {
    User.findOne({ _id: userId })
      .orFail()
      .then((user) => {
        if (!user) {
          return next(new NotFound('Not Found'));
        }
        return res.status(200).send({
          _id: user._id,
          avatar: user.avatar,
          name: user.name,
          about: user.about,
          email: user.email,
        });
      })
      .catch(() => next(new NotAllowed('Server Error')));
  } catch (error) {
    return next(new ServerError('Server Error'));
  }
};

module.exports = {
  getUsers,
  createUser,
  changeProfile,
  changeAvatar,
  login,
  checkToken,
};
