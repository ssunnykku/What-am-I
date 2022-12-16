import { Review } from '../models/Review.model.js';
import { ReviewLike } from '../models/ReviewLike.model';
import sequelize from '../config/sequelize';

import { REVIEW_PER_PAGE } from '../utils/Constant';
import { Sequelize } from 'sequelize';
import { AiSearchResult } from '../models/AiSearchResult.model.js';
import { User } from '../models/User.model';

const Op = Sequelize.Op;

class reviewService {
  static async addReview({ description, userId, aiResultId }) {
    const findReview = await Review.findOne({
      where: { userId, aiResultId },
    });

    if (findReview) {
      const errorMessage = '이미 후기가 작성된 결과입니다.';
      return errorMessage;
    }

    // db에 저장
    const createdNewReview = await Review.create({
      description,
      userId,
      aiResultId,
    });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  }

  //모든리뷰 다 가지고 오기
  static async countReviewpage() {
    const reviewCount = await Review.count();

    if (reviewCount % REVIEW_PER_PAGE === 0) {
      return reviewCount / REVIEW_PER_PAGE;
    } else {
      return Math.floor(reviewCount / REVIEW_PER_PAGE) + 1;
    }
  }

  static async selectReviews(defaultpage, _userId) {
    const selectedReviews = await Review.findAll({
      include: {
        model: AiSearchResult,
        attributes: {
          exclude: ['userId', 'id', 'dogName'],
        },
      },
      offset: (defaultpage - 1) * REVIEW_PER_PAGE,
      limit: REVIEW_PER_PAGE,
      order: [['id', 'DESC']],
    });

    for (const review of selectedReviews) {
      review.dataValues.likeCount = await ReviewLike.count({
        where: { reviewId: review.id },
      });
      review.dataValues.likeStatus = await ReviewLike.count({
        where: { userId: _userId, reviewId: review.id },
      });
      review.aiImage = await AiSearchResult.findOne({
        where: { userId: _userId, id: review.aiResultId },
      });
    }

    return selectedReviews;
  }

  static async showMyReviews({ userId }) {
    console.log(userId);
    const getMyReviews = await Review.findAll({
      where: { userId: userId },
      include: {
        model: AiSearchResult,
        attributes: {
          exclude: ['userId', 'id', 'dogName'],
        },
      },
    });
    if (!getMyReviews) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    }
    return getMyReviews;
  }

  // 한개 게시물 get해서 보기
  static async showReview({ _id }) {
    const review = await Review.findOne({
      include: [
        {
          model: User,
          right: true,
          attributes: ['nickname', 'profileImg'],
        },
        {
          model: AiSearchResult,
          attributes: ['aiImage'],
        },
      ],
      where: { id: _id },
    });

    if (!review) {
      const errorMessage = '작성하신 글이 없습니다';
      return { errorMessage };
    }
    return review;
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
      include: {
        model: AiSearchResult,
        attributes: {
          exclude: ['userId', 'id', 'dogName'],
        },
      },
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
