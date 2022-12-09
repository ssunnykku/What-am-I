import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';
import { CommunityPost } from '../models/CommunityPost.model';
import { sizePerPage } from '../utils/pagination';

class myPageService {
  static async UserToCommunity({ userId, defaultPage }) {
    // 전체 커뮤니티 수
    const communities = await Community.count({ where: { userId } });
    const dataSize = 10;
    const lastData = sizePerPage(communities, dataSize, defaultPage);

    const findUser = await Community.findAndCountAll({
      where: { userId },
      order: [['id', 'DESC']],
      limit: dataSize,
      offset: lastData,
    });
    return findUser;
  }

  static async getMyCommunities({ userId, defaultPage }) {
    const countCommunities = await CommunityLike.count({
      where: { userId: userId },
    });
    const dataSize = 10;
    const lastData = sizePerPage(countCommunities, dataSize, defaultPage);

    const findCommunities = await CommunityLike.findAndCountAll({
      where: { userId: userId },
      attributes: {
        exclude: ['id', 'userId', 'communityId', 'createdAt', 'updatedAt'],
      },
      limit: dataSize,
      offset: lastData,
      include: {
        model: Community,
      },
      order: [['id', 'DESC']],
    });

    return findCommunities;
  }

  static async getMyCommunitiesAndPosts({ userId, communityId }) {
    const isMyCommunity = await CommunityLike.findOne({
      where: { userId, communityId },
    });
    if (!isMyCommunity) {
      const errorMessage = `Cannot find data. It is not this user's Community`;
      throw errorMessage;
    }
    const findUserAndCommunityId = await CommunityPost.findAll({
      where: { userId, communityId },
      order: [['id', 'DESC']],
    });

    return findUserAndCommunityId;
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
