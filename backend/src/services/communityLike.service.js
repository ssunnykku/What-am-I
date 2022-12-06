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
      // const errorMessage = `you can do 'like' only once per a community`;
      return { deletedLike };
    }

    const newLike = await CommunityLike.create({
      userId,
      communityId,
    });

    const countLikes = await CommunityLike.count({
      where: { communityId: communityId },
    });

    return { newLike, countLikes };
  }
}

export { communityLikeService };
