import { Router } from 'express';
import { friendController } from '../controllers/friend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const friendRouter = Router();

// 1. 친구목록 추가/차단목록 추가
friendRouter.post(
  '/friends/:friendId/:friendOrBlockStatus',
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
// 4. 친구 삭제 or 차단 친구 해제(차단 목록에서 삭제)
friendRouter.delete(
  '/friends/:friendId',
  loginRequired,
  friendController.deleteFriend,
);

/**친구 차단 관련 */

// 5. 내가 차단한 친구 목록 전체 보기
friendRouter.get(
  '/friends/blocklist',
  loginRequired,
  friendController.getBlockList,
);

/**프로필 정보 하나씩 보기 */

// 6. 특정 유저의 프로필 정보 보기
friendRouter.get(
  '/friends/profile/:friendId',
  loginRequired,
  friendController.profile,
);
export { friendRouter };
