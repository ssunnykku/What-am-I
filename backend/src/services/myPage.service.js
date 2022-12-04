import { Community } from '../models/Community.model';

class myPageService {
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
