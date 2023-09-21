import { Router } from 'express';
import { reviewCommentController } from '../controllers/reviewComment.ctrl.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewCommentRouter = Router();

//댓글쓰기
reviewCommentRouter.post(
  '/reviewComment/:reviewId',
  loginRequired,
  reviewCommentController.newReviewComments,
);
//게시물(리뷰)에 댓글 전부 다 보기
reviewCommentRouter.get(
  '/reviewComment/:reviewId',
  loginRequired,
  reviewCommentController.showReviewComments,
);

//게시물(리뷰)에 댓글 한개 보기
reviewCommentRouter.get(
  '/reviewComment/:reviewId/:reviewCommentId',
  loginRequired,
  reviewCommentController.showOneReviewComments,
);

//내가 쓴 리뷰 수정
reviewCommentRouter.put(
  '/reviewComment/:reviewCommentId',
  loginRequired,
  reviewCommentController.updateComment,
);
//내가쓴 댓글 삭제
reviewCommentRouter.delete(
  '/reviewComment/:reviewCommentId',
  loginRequired,
  reviewCommentController.deleteComment,
);

export { reviewCommentRouter };
