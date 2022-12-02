import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { userValidator } from '../middlewares/userValidator';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const userRouter = Router();
const upload = uploadImageS3();

userRouter.post('/users', userValidator, userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/users', loginRequired, userController.userList);
userRouter.get('/users/current', loginRequired, userController.current);
userRouter.put('/users/:userId', loginRequired, userController.edit);
userRouter.patch(
  '/users/:userId/image',
  loginRequired,
  upload.single('profileImg'),
  userController.setImage,
);
userRouter.get('/users/:userId', loginRequired, userController.select);

export { userRouter };
