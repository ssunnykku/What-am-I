import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';
import { CommunityPost } from '../models/CommunityPost.model';

class myPageService {
  static async UserToCommunity({ userId }) {
    const findUser = await Community.findAll({
      where: { userId: userId },
      order: [['id', 'DESC']],
    });
    return findUser;
  }

  static async getMyCommunities({ userId }) {
    const findCommunities = await CommunityLike.findAll({
      where: { userId: userId },
      order: [['id', 'DESC']],
    });
    return findCommunities;
  }

  static async getMyCommunitiesAndPosts({ userId }) {
    const findUser = await Community.findAll({
      where: { userId: userId },
      order: [['id', 'DESC']],
      include: {
        model: CommunityPost,
      },
    });
    return { findUser };
  }
}

export { myPageService };
