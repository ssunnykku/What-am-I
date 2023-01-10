import { INTEGER } from 'sequelize';
import { CommunityLike } from '../models/CommunityLike.model';

class communityLikeService {
  static async addHeart({ userId, communityId }) {
    // DB에서 좋아요 했는지 찾기
    const findUserLiked = await CommunityLike.findOne({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });
    // 있으면 삭제하기
    if (findUserLiked) {
      const deletedLike = await CommunityLike.destroy({
        where: {
          userId: userId,
          communityId: communityId,
        },
      });

      // 좋아요 수 세기
      const countLikes = await CommunityLike.count({
        where: { communityId: communityId },
      });

      return { countLikes, deletedLike };
    }
    // 없으면 좋아요 추가하기
    await CommunityLike.create({
      userId: userId,
      communityId: communityId,
    });

    const newLike = await CommunityLike.findOne({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });
    // 좋아요 수 세기
    const countLikes = await CommunityLike.count({
      where: { communityId: communityId },
    });

    return { countLikes, newLike };
  }
}

export { communityLikeService };
