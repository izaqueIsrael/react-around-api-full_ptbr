/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const NotAllowed = require('../errors/NOT_ALLOWED');

dotenv.config();
const { JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((users) => res.status(201).send({ users }))
    .catch(() => next(new NotAllowed('Server Error')));
};

const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ error: 'ID do usuário não encontrado' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch(() => next(new NotAllowed('Server Error')));
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
        res.status(403).send({ message: 'Usuário já cadastrado' });
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
    .catch(() => next(new NotAllowed('Server Error')));
};

const changeProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, JWT_SECRET);
  if (payload.userId === req.body.user._id) {
    User.findByIdAndUpdate(req.body.user._id, { name, about }, { new: true })
      .orFail()
      .then((user) => res.status(201).send({ user }))
      .catch(() => next(new NotAllowed('Server Error')));
  } else {
    res.status(403).send({ message: 'Não autorizado' });
  }
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, JWT_SECRET);
  if (payload.userId === req.body.user._id) {
    User.findByIdAndUpdate(req.body.user._id, { avatar }, { new: true })
      .orFail()
      .then((user) => res.status(201).send({ user }))
      .catch((err) => res.status(404).send({ message: err.message }));
  } else {
    res.status(403).send({ message: 'Não autorizado' });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos' });
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos' });
          }

          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

          return res.status(200).json({ token });
        });
    })
    .catch(() => next(new NotAllowed('Server Error')));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  changeProfile,
  changeAvatar,
  login,
};
