import { CommunityLike } from '../models/CommunityLike.model';

class communityLikeService {
  static async addHeart({ userId, communityId }) {
    const newHeart = await CommunityLike.create({
      userId,
      communityId,
    });
    return newHeart;
  }
}

export { communityLikeService };
