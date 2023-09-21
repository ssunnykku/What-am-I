import { Router } from 'express';
import { communityPostLikeController } from '../controllers/communityPostLike.ctrl.js';

import { loginRequired } from '../middlewares/loginRequired.js';

const communityPostLikeRouter = Router();

communityPostLikeRouter.post(
  '/communityPostLike/:communityPostId',
  loginRequired,
  communityPostLikeController.addLike,
);

export { communityPostLikeRouter };
