const express = require('express');

const userRouter = express.Router();

const {
  validateChangeAvatar,
  validateGetUseById,
  validateChangeProfile,
  validateGetUsers,
} = require('../middlewares/validations');

const {
  getUsers,
  getUserById,
  changeProfile,
  changeAvatar,
} = require('../controllers/users');

userRouter.get('/', validateGetUsers, getUsers);
userRouter.get('/:userId', validateGetUseById, getUserById);
userRouter.patch('/me', validateChangeProfile, changeProfile);
userRouter.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = userRouter;
