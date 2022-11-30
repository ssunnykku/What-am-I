import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewAuthRouter = Router();

// 리뷰작성
reviewAuthRouter.post('/review', loginRequired, reviewController.register);
reviewAuthRouter.get('/myReviews', loginRequired, reviewController.myReviews);
reviewAuthRouter.get(
  '/reviews/:reviewId',
  loginRequired,
  reviewController.reviewComments,
);

export { reviewAuthRouter };
