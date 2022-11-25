import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const userRouter = Router();

userRouter.post('/users', userController.register);
userRouter.post('/users/login', userController.login);
userRouter.get('/users', userController.userList);
userRouter.get('/users/current', loginRequired, userController.current);
// userRouter.put('/users/:userId', userController.edit);
// userRouter.patch('/users/:userId/image', userController.setImage);
// userRouter.get('/users/:userId', userController.select);

export { userRouter };
