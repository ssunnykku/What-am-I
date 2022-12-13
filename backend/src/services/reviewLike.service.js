import { ReviewLike } from '../models/ReviewLike.model';
import sequelize from '../config/sequelize';

class reviewLikeService {
  static async addlike({ userId, reviewId }) {
    const findUserLiked = await ReviewLike.findOne({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });

    //만약 좋아요 한 것이 있다면, 삭제하기
    if (findUserLiked) {
      const myLikedeleted = await ReviewLike.destroy({
        where: {
          userId: userId,
          reviewId: reviewId,
        },
      });
      //좋아요 삭제후 다시 좋아요 개수 세서 값 리턴하기
      const totalLike_afterMyLikeDeleted = await ReviewLike.count({
        where: { reviewId: reviewId },
      });

      // const [countAll, metadata] = await sequelize.query(
      //   `select count(reviewId),RL.id,RL.userId,RL.reviewId from reviewLikes as RL where reviewId = ${reviewId}`,
      // );
      // select count(*),RL.id,RL.userId,RL.reviewId from reviewLikes as RL where reviewId = 1;

      return { totalLike_afterMyLikeDeleted, myLikedeleted };
    }

    //만약 좋아요가 없다면, 좋아요 생성
    await ReviewLike.create({
      userId: userId,
      reviewId: reviewId,
    });

    // //"내가" 생성한 좋아요 정보 조회(다시 조회를 안하면 reviewId가 문자로 리턴되는 문제가 있어서 다시 한번 조회함)
    // const myLikeInformation = await ReviewLike.findOne({
    //   userId: userId,
    //   reviewId: reviewId,
    // });
    // //좋아요 개수 다시 세기
    // const totalLikes = await ReviewLike.count({
    //   where: { reviewId },
    // });

    const [likeInformation, metadata] = await sequelize.query(
      `select count(reviewId),RL.id,RL.userId,RL.reviewId from reviewLikes as RL where reviewId = ${reviewId}`,
    );

    return {
      // myLikeInformation, totalLikes,
      likeInformation,
    };
  }
}

export { reviewLikeService };
