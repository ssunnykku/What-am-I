import { Router } from 'express';
import { revCommentController } from '../controllers/revComment.ctrl';

const revCommentAuthRouter = Router();

// 리뷰작성

revCommentAuthRouter.get(
  '/reviews/:reviewId',
  revCommentController.showComments,
);

revCommentAuthRouter.post(
  '/reviews/:reviewId',
  revCommentController.reviewComments,
);
export { revCommentAuthRouter };
