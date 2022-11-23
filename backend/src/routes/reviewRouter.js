import { Router } from 'express';
import { reviewController } from '../controllers/review.ctrl';

const reviewAuthRouter = Router();

// 회원가입
reviewAuthRouter.post('/review', reviewController.register);

export { reviewAuthRouter };
