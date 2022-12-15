import { INTEGER } from 'sequelize';
import { CommunityPostLike } from '../models/CommunityPostLike.model';

class communityPostLikeService {
  static async addlike({ userId, communityPostId }) {
    const findUserLiked = await CommunityPostLike.findOne({
      where: {
        userId: userId,
        communityPostId: communityPostId,
      },
    });
    if (findUserLiked) {
      const deletedLike = await CommunityPostLike.destroy({
        where: {
          userId: userId,
          communityPostId: communityPostId,
        },
      });

      const countLikes = await CommunityPostLike.count({
        where: { communityPostId: communityPostId, userId: userId },
      });

      return { countLikes, deletedLike };
    }

    await CommunityPostLike.create({
      userId: userId,
      communityPostId: communityPostId,
    });

    const newLike = await CommunityPostLike.findOne({
      where: {
        userId: userId,
        communityPostId: communityPostId,
      },
    });

    const countLikes = await CommunityPostLike.count({
      where: { communityPostId: communityPostId },
    });

    return { countLikes, newLike };
  }
}

export { communityPostLikeService };
