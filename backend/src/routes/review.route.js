import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const reviewRouter = Router();
const upload = uploadImageS3();

//리뷰 전부다 가지고오기
reviewRouter.get('/reviews', reviewController.allReviews);

// 리뷰 작성하기
reviewRouter.post(
  '/review',
  loginRequired,
  // upload.single('images'),
  reviewController.register,
);

//내가쓴 모든 리뷰 다 가지고오기
reviewRouter.get('/review/my', loginRequired, reviewController.myReviews);

//한개의 리뷰만 보기
reviewRouter.get(
  '/review/show/:reviewId',
  loginRequired,
  reviewController.review,
);

//내가쓴 리뷰 수정
reviewRouter.put(
  '/review/:reviewId',
  loginRequired,
  reviewController.updateReview,
);

//리뷰 삭제
reviewRouter.delete(
  '/review/:reviewId',
  loginRequired,
  reviewController.deleteReview,
);

reviewRouter.get(
  '/review/search',
  loginRequired,
  reviewController.getFoundReviews,
);

export { reviewRouter };
