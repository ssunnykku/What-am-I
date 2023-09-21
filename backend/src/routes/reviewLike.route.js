import { Router } from 'express';
import { reviewLikeController } from '../controllers/reviewLike.ctrl.js';

import { loginRequired } from '../middlewares/loginRequired.js';

const reviewLikeRouter = Router();

reviewLikeRouter.post(
  '/reviewLike/:reviewId',
  loginRequired,
  reviewLikeController.addLike,
);

export { reviewLikeRouter };
