const mongoose = require('mongoose');
const Card = require('../models/card');
const User = require('../models/user');
const NotFound = require('../errors/NOT_FOUND');
const NotModified = require('../errors/NOT_MODIFIED');
const ServerError = require('../errors/SERVER_ERROR');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner');

    if (!cards) {
      return next(new NotFound('No cards'));
    }

    return res.status(200).send(cards);
  } catch (error) {
    return next(new ServerError('Server Error'));
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new NotFound('User Not Found'));
    }

    const newId = new mongoose.Types.ObjectId();

    const card = await Card.create({
      _id: newId,
      name,
      link,
      owner: {
        _id: user._id,
        likes: [],
        avatar: user.avatar,
        name: user.name,
        about: user.about,
        email: user.email,
      },
    });

    return res.status(201).send({ data: card });
  } catch (error) {
    return next(new ServerError('Server Error'));
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findOneAndRemove({
      _id: req.params.cardId,
      owner: { _id: req.user.userId },
    });

    if (!card) {
      return next(new NotFound('Card not found or not owned by the user'));
    }

    return res.status(201).send({ data: card });
  } catch (err) {
    return next(new ServerError('Server Error'));
  }
};

const addLike = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new NotFound('User Not Found'));
    }

    const cardAux = await Card.findById(req.params.cardId);

    if (!cardAux) {
      return next(new NotFound('Card Not Found'));
    }

    if (cardAux.likes.some((like) => like.equals(user._id))) {
      return next(new NotModified('User already liked this card'));
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: {
          likes: {
            _id: user._id,
          },
        },
      },
      { new: true },
    );

    if (!card) {
      return next(new NotFound('Card not found or not owned by the user'));
    }

    return res.status(201).send({ data: card });
  } catch (error) {
    return next(new ServerError('Server Error'));
  }
};

const dislike = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new NotFound('User not found'));
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: {
          likes: user._id,
        },
      },
      { new: true },
    );

    if (!card) {
      return next(new NotFound('User not found'));
    }

    return res.status(200).send({ data: card });
  } catch (err) {
    return next(new ServerError('Server Error'));
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislike,
};
