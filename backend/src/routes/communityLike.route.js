import { Router } from 'express';
import { communityLikeController } from '../controllers/communityLike.ctrl.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityLikeRouter = Router();

communityLikeRouter.post(
  '/communitieslikes/:communityId',
  loginRequired,
  communityLikeController.addLike,
);

export { communityLikeRouter };
