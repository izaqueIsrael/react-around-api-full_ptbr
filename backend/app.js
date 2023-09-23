const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3001;
    this.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/aroundb';
  }

  configureMiddleware() {
    this.app.use(cors());
    this.app.options('*', cors());
    this.app.use(morgan('dev', { stream: winston.stream.write }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  configureRoutes() {
    const { validateSignup, validateSignin } = require('./middlewares/validations');
    const { createUser, login } = require('./controllers/users');
    const auth = require('./middlewares/auth');
    const logger = require('./middlewares/errorRegister');
    const cardRouter = require('./routes/cardRouter');
    const userRouter = require('./routes/userRouter');
    const absentRouter = require('./routes/absentRouter');

    this.app.get('/crash-test', () => {
      setTimeout(() => {
        throw new Error('O servidor travará agora');
      }, 0);
    });

    this.app.post('/signin', validateSignin, login);
    this.app.post('/signup', validateSignup, createUser);
    this.app.use('/cards', auth, cardRouter);
    this.app.use('/users', auth, userRouter);
    this.app.use('/*', absentRouter);

    this.app.use((err, req, res, next) => {
      logger.error(err.stack);
      next(err);
    });
  }

  connectToDatabase() {
    mongoose.connect(this.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  start() {
    this.connectToDatabase();
    this.configureMiddleware();
    this.configureRoutes();
    this.app.listen(this.PORT, () => {
      console.log(`Server started on port ${this.PORT}`);
    });
  }
}

const serverInstance = new Server();
serverInstance.start();
