const express = require('express');

const cardRouter = express.Router();

const {
  validateCreateCard,
  validateDeleteCard,
  validateLike,
  validateDislike,
} = require('../middlewares/validations');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislike,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateDeleteCard, deleteCard);
cardRouter.put('/:cardId/likes', validateLike, addLike);
cardRouter.delete('/:cardId/likes', validateDislike, dislike);

module.exports = cardRouter;
