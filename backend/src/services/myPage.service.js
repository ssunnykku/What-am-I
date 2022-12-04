import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';

class myPageService {
  static async getMyCommunities({ userId }) {
    const findCommunities = await CommunityLike.findAll({
      where: { userId: userId },
      order: [['id', 'DESC']],
    });
    return findCommunities;
  }

  static async UserToCommunity({ userId }) {
    const findUser = await Community.findAll({
      where: { userId: userId },
    });
    return findUser;
  }

  static async getMyCommunitiesAndPosts({ userId }) {
    const findUser = await Community.findAll({
      where: { userId: userId },
    });
  }
}

export { myPageService };
