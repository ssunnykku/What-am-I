import { Router } from 'express';
import { userController } from '../controllers/user.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const userRouter = Router();
const upload = uploadImageS3();

// 회원가입
userRouter.post('/users', userController.register);
// 로그인
userRouter.post('/login', userController.login);
// 전체 가입자 목록
userRouter.get('/users', loginRequired, userController.userList);
// 현재 로그인한 user 정보
userRouter.get('/users/current', loginRequired, userController.current);
// 회원정보 수정
userRouter.put('/users/:userId', loginRequired, userController.edit);
// 프로필 이미지 업로드
userRouter.patch(
  '/users/:userId/image',
  loginRequired,
  upload.single('profileImg'),
  userController.setImage,
);
// 특정 userId의 정보 가져오기
userRouter.get('/users/:userId', loginRequired, userController.select);
// 회원 탈퇴
userRouter.delete('/users', loginRequired, userController.withdrawal);

// 로그아웃, api 명세서 입력 전임
userRouter.delete('/users/current', loginRequired, userController.logOut);

// refresh 토큰으로 access 토큰 재발급
userRouter.post('/users/current/refreshtoken', userController.verifyToken);
export { userRouter };
