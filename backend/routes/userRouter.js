const express = require('express');

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const {
      validateChangeAvatar,
      validateChangeProfile,
      validateGetUsers,
      validateCheckUser,
    } = require('../middlewares/validations');

    const {
      getUsers,
      changeProfile,
      changeAvatar,
      checkToken,
    } = require('../controllers/users');

    this.router.get('/', validateGetUsers, getUsers);
    this.router.get('/me', validateCheckUser, checkToken);
    this.router.patch('/me', validateChangeProfile, changeProfile);
    this.router.patch('/me/avatar', validateChangeAvatar, changeAvatar);
  }
}

module.exports = new UserRouter().router;
