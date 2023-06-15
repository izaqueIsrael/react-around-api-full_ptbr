const express = require('express');

const userRouter = express.Router();

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

userRouter.get('/', validateGetUsers, getUsers);
userRouter.get('/me', validateCheckUser, checkToken);
userRouter.patch('/me', validateChangeProfile, changeProfile);
userRouter.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = userRouter;
