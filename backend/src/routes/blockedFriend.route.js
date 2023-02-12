import { Router } from 'express';
import { blockFriendController } from '../controllers/blockFriend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const blockFriendRouter = Router();

// 차단하기
blockFriendRouter.post(
  '/friends/blocks/:friendId',
  loginRequired,
  blockFriendController.blockFriend,
);

export { blockFriendRouter };
