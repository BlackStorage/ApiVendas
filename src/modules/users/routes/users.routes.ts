import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersControler from '../controller/UsersControler';
import isAuthenticatad from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersControler = new UsersControler();

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

export default usersRouter;
