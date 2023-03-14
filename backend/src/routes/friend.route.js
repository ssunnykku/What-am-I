import { Router } from 'express';
import { friendController } from '../controllers/friend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const friendRouter = Router();

// 1. 친구목록 추가
friendRouter.post(
  '/friends/:friendId/:status',
  loginRequired,
  friendController.addFriend,
);
// 2. 내가 추가한 친구 보기(following)
friendRouter.get(
  '/friends/followings',
  loginRequired,
  friendController.getFollowings,
);
// 3. 나를 추가한 친구 보기(followers)
friendRouter.get(
  '/friends/followers',
  loginRequired,
  friendController.getFollowers,
);
// 4. 친구 삭제
friendRouter.delete(
  '/friends/:friendId',
  loginRequired,
  friendController.deleteFriend,
);

export { friendRouter };
