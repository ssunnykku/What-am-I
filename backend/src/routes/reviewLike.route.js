import { Router } from 'express';
// import { reviewLikeController } from '../controllers/reivewLike.ctrl.js';
import { reviewLikeController } from '../controllers/reviewLike.ctrl';

import { loginRequired } from '../middlewares/loginRequired.js';

const reviewLikeRouter = Router();

reviewLikeRouter.post(
  '/reviewLike/:reviewId',
  loginRequired,
  reviewLikeController.addLike,
);

// reviewLikeRouter.delete(
//   '/reviewLike/:reviewId',
//   loginRequired,
//   reviewLikeController.cancelLike,
// );

export { reviewLikeRouter };
