import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersControler from '../controller/UsersControler';
import isAuthenticatad from '../../../shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const usersControler = new UsersControler();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticatad, usersControler.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  usersControler.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticatad,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
