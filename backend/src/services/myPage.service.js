import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';
import { CommunityPost } from '../models/CommunityPost.model';
import { sizePerPage } from '../utils/pagination';

class myPageService {
  static async UserToCommunity({ userId }) {
    // 전체 커뮤니티 수
    const communities = await Community.count({ where: { userId } });

    const findUser = await Community.findAll({
      where: { userId },
      order: [['id', 'DESC']],
    });
    return findUser;
  }

  static async getMyCommunities({ userId, page }) {
    const countCommunities = await CommunityLike.count({
      where: { userId: userId },
    });
    const limit = 10;

    const findCommunities = await CommunityLike.findAndCountAll({
      where: { userId: userId },
      attributes: {
        exclude: ['id', 'userId', 'communityId', 'createdAt', 'updatedAt'],
      },
      limit,
      offset: sizePerPage(countCommunities, limit, page),
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
