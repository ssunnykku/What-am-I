import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';
import { CommunityPost } from '../models/CommunityPost.model';

class myPageService {
  static async UserToCommunity({ userId }) {
    // 전체 커뮤니티 수
    const communities = await Community.count({ where: { userId } });

    const findUser = await Community.findAndCountAll({
      where: { userId },

      order: [['id', 'DESC']],
    });
    return findUser;
  }

  static async getMyCommunities({ userId }) {
    const findCommunities = await CommunityLike.findAll({
      where: { userId: userId },
      include: {
        model: Community,
      },
      order: [['id', 'DESC']],
    });
    return findCommunities;
  }

  static async getMyCommunitiesAndPosts({ userId, communityId }) {
    const findUser = await CommunityPost.findAll({
      where: { userId, communityId },
      order: [['id', 'DESC']],
    });
    return findUser;
  }

  static async findCommunity({ communityId }) {
    const result = await CommunityPost.findAll({
      where: { communityId },
      order: [['id', 'DESC']],
    });
    return result;
  }
}

export { myPageService };
