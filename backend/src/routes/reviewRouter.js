import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';

const reviewAuthRouter = Router();

// 리뷰작성
reviewAuthRouter.post('/review', reviewController.register);
reviewAuthRouter.get('/myReviews', reviewController.myReviews);
reviewAuthRouter.get('/reviews/:', reviewController.myReviews);

export { reviewAuthRouter };
