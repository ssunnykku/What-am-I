import { Router } from 'express';
import { friendController } from '../controllers/friend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const friendRouter = Router();

// 친구목록 추가
friendRouter.post(
  '/friends/:friendId',
  loginRequired,
  friendController.addFriend,
);

export { friendRouter };
