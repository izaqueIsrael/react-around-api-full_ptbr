const mongoose = require('mongoose');
const Card = require('../models/card');
const NotAllowed = require('../errors/NOT_ALLOWED');

const getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(201).send({ cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const newId = new mongoose.Types.ObjectId();
  Card.create({
    _id: newId,
    name,
    link,
    owner: req.user._id,
  })
    .orFail()
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => next(new NotAllowed('Server Error')));
};

const deleteCard = (req, res, next) => {
  if (req.params.userId === req.user._id) {
    Card.findOneAndRemove({ _id: req.params.cardId, owner: req.user._id })
      .orFail()
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Its not your card' });
          return;
        }
        res.status(201).send({ data: card });
      })
      .catch(() => next(new NotAllowed('Server Error')));
  } else {
    res.status(403).send({ message: 'Não autorizado' });
  }
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => next(new NotAllowed('Server Error')));
};

const dislike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => next(new NotAllowed('Server Error')));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislike,
};
