import { INTEGER } from 'sequelize';
import { CommunityLike } from '../models/CommunityLike.model';

class communityLikeService {
  static async addHeart({ userId, communityId }) {
    const findUserLiked = await CommunityLike.findOne({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });
    if (findUserLiked) {
      const deletedLike = await CommunityLike.destroy({
        where: {
          userId: userId,
          communityId: communityId,
        },
      });

      const countLikes = await CommunityLike.count({
        where: { communityId: communityId, userId: userId },
      });

      return { countLikes, deletedLike };
    }

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

    const countLikes = await CommunityLike.count({
      where: { communityId: communityId },
    });

    return { countLikes, newLike };
  }
}

export { communityLikeService };
