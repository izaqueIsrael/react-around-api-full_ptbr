const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const { PORT = 3000 } = process.env;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/aroundb';

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('dev', { stream: winston.stream.write }));

const { validationSignin, validationSignup } = require('./middlewares/validations');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/errorRegister');
const cardRouter = require('./routes/cardRouter');
const userRouter = require('./routes/userRouter');
const absentRouter = require('./routes/absentRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/signin', validationSignin, login);
app.post('/signup', validationSignup, createUser);
app.use('/cards', auth, cardRouter);
app.use('/users', auth, userRouter);
app.use('/*', absentRouter);
app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

app.listen(PORT);
