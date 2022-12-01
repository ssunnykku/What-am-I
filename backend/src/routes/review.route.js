import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewAuthRouter = Router();

//리뷰 전부다 가지고오기
reviewAuthRouter.get('/reviews', reviewController.allReviews);

// 리뷰 작성하기
reviewAuthRouter.post('/review', loginRequired, reviewController.register);

//내가쓴 모든 리뷰 다 가지고오기
reviewAuthRouter.get('/review/my', loginRequired, reviewController.myReviews);

//한개의 리뷰만 보기
reviewAuthRouter.get(
  '/review/show/:reviewId',
  loginRequired,
  reviewController.review,
);

//내가쓴 리뷰 수정
reviewAuthRouter.put(
  '/review/:reviewId',
  loginRequired,
  reviewController.updateReview,
);

export { reviewAuthRouter };
