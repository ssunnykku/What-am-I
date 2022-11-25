import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { userValidator } from '../middlewares/userValidator';

const userRouter = Router();

userRouter.post('/users', userValidator, userController.register);
userRouter.post('/users/login', userController.login);
userRouter.get('/users', userController.userList);
userRouter.get('/users/current', loginRequired, userController.current);
// 회원정보 수정
userRouter.put('/users/:userId', loginRequired, userController.edit);
// userRouter.patch('/users/:userId/image', userController.setImage);
// userRouter.get('/users/:userId', userController.select);

export { userRouter };
