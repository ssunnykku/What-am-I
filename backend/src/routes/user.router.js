import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';

const userRouter = Router();

userRouter.post('/users', userController.register);
userRouter.post('/users/login', userController.login);
userRouter.get('/users', userController.userList);
// userAuthRouter.get('/users/current', userController.current);
// userAuthRouter.put('/users/:userId', userController.edit);
// userRouter.patch('/users/:userId/image', userController.setImage);
// userAuthRouter.get('/users/:userId', userController.select);

export { userRouter };
