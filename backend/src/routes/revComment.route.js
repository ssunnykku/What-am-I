import { Router } from 'express';
import { revCommentController } from '../controllers/revComment.ctrl';

const revCommentAuthRouter = Router();

// 리뷰작성

revCommentAuthRouter.post(
  '/reviews/:reviewId',
  revCommentController.reviewComments,
);
revCommentAuthRouter.get(
  '/revComment/:reviewId',
  revCommentController.showComments,
);

export { revCommentAuthRouter };
