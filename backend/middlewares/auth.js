/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: 'Não autorizado' });
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
    return res.status(403).send({ message: 'Não autorizado' });
  }
};

module.exports = auth;
