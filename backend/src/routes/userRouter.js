import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';

const userAuthRouter = Router();

userAuthRouter.post('/users', userController.register);
userAuthRouter.post('/users/login', userController.login);
userAuthRouter.get('/users', userController.userList);
userAuthRouter.get('/users/current', userController.current);
userAuthRouter.put('/users/:userId', userController.edit);
userAuthRouter.get('/users/:userId', userController.select);

export { userAuthRouter };
