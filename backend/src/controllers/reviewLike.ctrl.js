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
        throw new Error(findReviewLike.errorMessage);
      }
      return res.status(201).json(findReviewLike);
    } catch (error) {
      next(error);
    }
  }

  // static async cancelLike(req, res, next) {
  //   try {
  //     const userId = req.currentUserId;
  //     const reviewId = req.params.reviewId;
  //     const findReviewLike = await reviewLikeService.cancelReviewLike({
  //       userId,
  //       reviewId,
  //     });

  //     if (findReviewLike.errorMessage) {
  //       throw new Error(findReviewLike.errorMessage);
  //     }

  //     return res.status(200).send(findReviewLike);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export { reviewLikeController };
