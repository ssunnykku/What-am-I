import { Router } from 'express';
import { reviewCommentController } from '../controllers/revComment.ctrl';

const reviewCommentAuthRouter = Router();

// 리뷰작성

reviewCommentAuthRouter.post(
  '/reviewComment/:reviewId',
  reviewCommentController.reviewComments,
);
reviewCommentAuthRouter.get(
  '/reviewComment/:reviewId',
  reviewCommentController.showComments,
);

export { reviewCommentAuthRouter };
