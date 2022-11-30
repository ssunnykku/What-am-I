import { Router } from 'express';
import { reviewCommentController } from '../controllers/revComment.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewCommentAuthRouter = Router();

// 리뷰작성

reviewCommentAuthRouter.post(
  '/reviewComment/:reviewId',
  loginRequired,
  reviewCommentController.reviewComments,
);
reviewCommentAuthRouter.get(
  '/reviewComment/:reviewId',
  loginRequired,
  reviewCommentController.showComments,
);

reviewCommentAuthRouter.put(
  '/reviewComment/edit/:id',
  loginRequired,
  reviewCommentController.updateComment,
);
reviewCommentAuthRouter.delete(
  '/reviewComment/:id',
  loginRequired,
  reviewCommentController.deleteComment,
);

export { reviewCommentAuthRouter };
