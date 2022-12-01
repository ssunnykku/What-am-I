import Review from '../models/Review.model.js';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

class reviewService {
  //모든리뷰 다 가지고 오기
  static async showAllReviews({}) {
    const reviewId = await Review.findAll({
      where: { reviewId: { [Op.gt]: 0 } },
    });

    if (!reviewId) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    } else {
      return reviewId;
    }
  }

  //
  static async addReview({ description, images, userId }) {
    // db에 저장
    const createdNewReview = await Review.create({
      description,
      images,
      userId,
    });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  }

  //
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

  //
  static async showReview({ reviewId }) {
    const reviewId_ = await Review.findOne({
      where: { reviewId },
    });
    if (!reviewId_) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    } else {
      return reviewId_;
    }
  }

  static async updateReview({ description, reviewId, userId }) {
    //db검색
    const updateReview = await Review.findOne({
      where: { reviewId: reviewId, userId: userId },
    });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!updateReview) {
      const errorMessage = '등록한 댓글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }
    // db에 저장
    if (updateReview) {
      const updateReview = await Review.update(
        { description: description },
        { where: { reviewId: reviewId, userId: userId } },
      );
      updateReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return updateReview;
    }
  }

  static async findMessage({ reviewId, userId }) {
    const comment = await Review.findOne({
      where: { reviewId: reviewId, userId: userId },
    });
    if (!comment) {
      const errorMessage = '작성한 글이 없습니다';
      return { errorMessage };
    } else {
      return comment;
    }
  }
}

export { reviewService };
