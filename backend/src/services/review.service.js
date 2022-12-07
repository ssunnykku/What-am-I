import { Review } from '../models/Review.model.js';
import { REVIEW_PER_PAGE } from '../utils/Constant';
import { Sequelize } from 'sequelize';

const Op = Sequelize.Op;

class reviewService {
  //모든리뷰 다 가지고 오기
  static async countReviewpage() {
    const reviewCount = await Review.count();

    // const reviewId = await Review.findAll({
    //   where: { id: { [Op.gt]: 0 } },
    //   order: [['id', 'DESC']],
    // });
    if (reviewCount % REVIEW_PER_PAGE === 0) {
      return reviewCount / REVIEW_PER_PAGE;
    } else {
      return Math.floor(reviewCount / REVIEW_PER_PAGE) + 1;
    }
  }

  static async selectReviews(page) {
    const selectedReivews = await Review.findAll({
      offset: (page - 1) * REVIEW_PER_PAGE,
      limit: REVIEW_PER_PAGE,
      order: [['id', 'DESC']],
      // offset: 0,
      // limit: 10,
    });

    if (!selectedReivews) {
      throw ApiError.setBadRequest('No reivew available');
    }

    return selectedReivews;
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
  static async showReview({ _id: id }) {
    const reviewId = await Review.findOne({
      where: { id: id },
    });
    if (!reviewId) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    } else {
      return reviewId;
    }
  }

  static async updateReview({ description, reviewId: id, userId }) {
    //db검색
    const updateReview = await Review.findOne({
      where: { id: id, userId: userId },
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
        { where: { id: id, userId: userId } },
      );
      updateReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return updateReview;
    }
  }

  static async findMessage({ reviewId: id, userId }) {
    const comment = await Review.findOne({
      where: { id: id, userId: userId },
    });
    if (!comment) {
      const errorMessage = '작성한 글이 없습니다';
      return { errorMessage };
    } else {
      return comment;
    }
  }

  static async deleteReview({ reviewId: id, userId }) {
    const _id = await Review.destroy({
      where: { id: id, userId: userId },
    });
    if (!_id) {
      const errorMessage = '후기가 없습니다';
      return errorMessage;
    } else {
      const message = '후기가 삭제되었습니다.';
      return message;
    }
  }

  static async searchReviews({ search }) {
    const searchResult = await Review.findAndCountAll({
      where: {
        description: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [['id', 'DESC']],
    });
    if (searchResult.length === 0) {
      const errorMessage = `Cannot find information about '${search}' `;
      return errorMessage;
    }
    return searchResult;
  }
}

export { reviewService };
