import { CommunityLike } from '../models/CommunityLike.model';

class communityLikeService {
  static async addHeart({ userId, communityId }) {
    const findUserLike = await CommunityLike.findOne({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });
    if (findUserLike) {
      const errorMessage = `you can do 'like' only once per a community`;
      return { errorMessage };
    }

    const newHeart = await CommunityLike.create({
      userId,
      communityId,
    });
    return newHeart;
  }
}

export { communityLikeService };
