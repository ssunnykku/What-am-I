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
      const errorMessage = `you can do 'like' only once per a community`;
      return { errorMessage };
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

  static async cancelCommunityLike({ userId, communityId }) {
    const findUserLiked = await CommunityLike.findOne({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });

    if (!findUserLiked) {
      const errorMessage = `cannot find a 'like'`;
      return { errorMessage };
    }

    const deletedLike = await CommunityLike.destroy({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });

    const countLikes = await CommunityLike.count({
      where: { communityId: communityId },
    });

    return { findUserLiked, countLikes };
  }
}

export { communityLikeService };
