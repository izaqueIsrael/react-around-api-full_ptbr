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
cardRouter.put('/likes/:cardId', validateLike, addLike);
cardRouter.delete('/likes/:cardId', validateDislike, dislike);
cardRouter.delete('/:cardId', validateDeleteCard, deleteCard);

module.exports = cardRouter;
