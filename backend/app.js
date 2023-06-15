// Meu nobre venho através dessa mensagem para pedir que desconsidere o domínio
// e o protocolo https de sua correção porque o site de obtenção de domínio da practicum
// está quebrado e sem domínio ñ posso implantar o https

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
const { PORT = 3000 } = process.env;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/aroundb';

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('dev', { stream: winston.stream.write }));

const { validateSignup, validateSignin } = require('./middlewares/validations');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/errorRegister');
const cardRouter = require('./routes/cardRouter');
const userRouter = require('./routes/userRouter');
const absentRouter = require('./routes/absentRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);
app.use('/cards', auth, cardRouter);
app.use('/users', auth, userRouter);
app.use('/*', absentRouter);
app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

app.listen(PORT);
