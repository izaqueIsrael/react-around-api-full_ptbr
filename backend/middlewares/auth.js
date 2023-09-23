/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const NotAllowed = require('../errors/NOT_ALLOWED');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new NotAllowed('Não Autorizado1'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-dev-secret',
    );
    req.user = payload;
    next();
  } catch (err) {
    return next(new NotAllowed('Não Autorizado2'));
  }
};

module.exports = auth;
