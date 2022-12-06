import { reviewLikeService } from '../services/reviewLike.service.js';

class reviewLikeController {
  static async addLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const reviewId = req.params.reviewId;
      const findReviewLike = await reviewLikeService.addlike({
        userId,
        reviewId,
      });

      if (findReviewLike.errorMessage) {
        throw new Error(findReviewLike);
      }
      return res.status(201).json(findReviewLike);
    } catch (error) {
      next(error);
    }
  }
}

export { reviewLikeController };
