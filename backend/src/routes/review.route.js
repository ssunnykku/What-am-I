import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewAuthRouter = Router();

// 리뷰작성
reviewAuthRouter.post('/review', loginRequired, reviewController.register);
reviewAuthRouter.get('/review', loginRequired, reviewController.myReviews);
reviewAuthRouter.get(
  '/review/my/:reviewId',
  loginRequired,
  reviewController.review,
);

export { reviewAuthRouter };
