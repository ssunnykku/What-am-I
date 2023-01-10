import { PinnedCommunity } from '../models/PinnedCommunity.model';
import { Community } from '../models/Community.model';

class pinnedCommunityService {
  static async pinnedCommunities({ userId, communityId }) {
    // 조회
    const findCommunity = await PinnedCommunity.findOne({
      where: { userId, communityId },
    });
    // 내역 없으면 pin 취소하기
    if (findCommunity) {
      const canceledPin = await PinnedCommunity.destroy({
        where: { userId, communityId },
      });
      return canceledPin;
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
