const express = require('express');

class AbsentRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.all('/', (req, res) => {
      res.status(404).send({ message: 'A solicitação não foi encontrada' });
    });
  }
}

module.exports = new AbsentRouter().router;
