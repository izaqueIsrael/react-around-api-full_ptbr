const express = require('express');

class CardRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
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

    this.router.get('/', getCards);
    this.router.post('/', validateCreateCard, createCard);
    this.router.put('/likes/:cardId', validateLike, addLike);
    this.router.delete('/likes/:cardId', validateDislike, dislike);
    this.router.delete('/:cardId', validateDeleteCard, deleteCard);
  }
}

module.exports = new CardRouter().router;
