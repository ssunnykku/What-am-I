import { Community } from '../models/Community.model';

class myPageService {
  static async UserToCommunity({ userId }) {
    const findUser = await Community.findMany({
      where: { userId: userId },
    });
    return findUser;
  }
}

export { myPageService };
