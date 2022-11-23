import Review from '../models/Review.model.js';

class reviewService {
  static async addReview({ description, images, userId }) {
    // const user = await UserController.findByUserEmail({ email });

    // if (user) {
    //   const errorMessage = '사용중인 이메일입니다.';
    //   return { errorMessage };
    // }

    // db에 저장
    const createdNewReview = await Review.create({
      description,
      images,
      userId,
    });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  }

  static async showMyReviews({ userId: UserId }) {
    const userId = await Review.findAll({
      where: { UserId },
    });
    if (!userId) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    } else {
      return userId;
    }
  }
  static async showReviewComments({ reviewId: UserId }) {
    const reviewId = await Review.findAll({
      where: { UserId },
    });
    if (!reviewId) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    } else {
      return reviewId;
    }
  }
}

export { reviewService };
