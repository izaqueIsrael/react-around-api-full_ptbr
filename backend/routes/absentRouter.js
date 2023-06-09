const express = require('express');

const absentRouter = express.Router();

absentRouter.all('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

module.exports = absentRouter;
