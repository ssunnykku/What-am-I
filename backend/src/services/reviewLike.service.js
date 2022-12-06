import { ReviewLike } from '../models/ReviewLike.model';

class reviewLikeService {
  static async addlike({ userId, reviewId }) {
    const findUserLiked = await ReviewLike.findOne({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });
    const myLikedeleted_totalLike = await ReviewLike.destroy({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });

    if (findUserLiked) {
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

  //   static async cancelReviewLike({ userId, reviewId }) {
  //     const findUserLiked = await ReviewLike.findOne({
  //       where: {
  //         userId: userId,
  //         reviewId: reviewId,
  //       },
  //     });

  //     if (!findUserLiked) {
  //       const errorMessage = `cannot find a 'like'`;
  //       return { errorMessage };
  //     }

  //     const deletedLike = await ReviewLike.destroy({
  //       where: {
  //         userId: userId,
  //         reviewId: reviewId,
  //       },
  //     });

  //     const countReviewLikes = await ReviewLike.count({
  //       where: { reviewId: reviewId },
  //     });

  //     return { countReviewLikes };
  //   }
}

export { reviewLikeService };
