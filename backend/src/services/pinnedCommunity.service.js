import { PinnedCommunity } from '../models/PinnedCommunity.model';
import { Community } from '../models/Community.model';

class pinnedCommunityService {
  static async pinnedCommunities({ userId, communityId }) {
    const findCommunity = await PinnedCommunity.findOne({
      where: { userId, communityId },
    });
    if (findCommunity) {
      const pin = await PinnedCommunity.destroy({
        where: { userId, communityId },
      });

      return pin;
    }
    const pin = await PinnedCommunity.create({
      userId,
      communityId,
    });
    return pin;
  }

  // pin한 커뮤니티 가져오기
  static async getCommunities({ userId }) {
    const findCommunities = await PinnedCommunity.findAll({
      include: { model: Community },
      where: { userId },
    });
    return findCommunities;
  }
}

export { pinnedCommunityService };
