import { Community } from '../models/Community.model';
import { CommunityLike } from '../models/CommunityLike.model';
import { CommunityPost } from '../models/CommunityPost.model';

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
    const sizePerPage = 10;
    const totalPage = Math.ceil(countCommunities / 10);

    const requestedPage = page * sizePerPage - 10;
    const size =
      requestedPage > totalPage
        ? totalPage
        : requestedPage <= 0
        ? 0
        : requestedPage;

    const findCommunities = await CommunityLike.findAndCountAll({
      where: { userId: userId },
      attributes: {
        exclude: ['id', 'userId', 'communityId', 'createdAt', 'updatedAt'],
      },
      limit: sizePerPage,
      offset: size,
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
