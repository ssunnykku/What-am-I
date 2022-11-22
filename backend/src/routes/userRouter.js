import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/users', userController.register);

export { userAuthRouter };
