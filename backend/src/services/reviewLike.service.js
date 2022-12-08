import { ReviewLike } from '../models/ReviewLike.model';

class reviewLikeService {
  static async addlike({ userId, reviewId }) {
    const findUserLiked = await ReviewLike.findOne({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });

    if (findUserLiked) {
      const myLikedeleted = await ReviewLike.destroy({
        where: {
          userId: userId,
          reviewId: reviewId,
        },
      });

      const myLikedeleted_totalLike = await ReviewLike.count({
        where: { reviewId: reviewId },
      });

      return { myLikedeleted_totalLike };
    } else {
      const myLikeInformation = await ReviewLike.create({
        userId,
        reviewId,
      });

      const totalLikes = await ReviewLike.count({
        where: { reviewId: reviewId },
      });

      return { myLikeInformation, totalLikes };
    }
  }
}

export { reviewLikeService };
