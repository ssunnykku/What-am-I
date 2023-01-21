import { Router } from 'express';
import { friendController } from '../controllers/friend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const friendRouter = Router();

friendRouter.post(
  '/friends/:friendId',
  loginRequired,
  friendController.addFriend,
);

friendRouter.post(
  '/friends/blocks/:friendId',
  loginRequired,
  friendController.blockFriend,
);

export { friendRouter };
