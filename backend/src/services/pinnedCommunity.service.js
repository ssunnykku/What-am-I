import { PinnedCommunity } from '../models/PinnedCommunity.model';
import { Community } from '../models/Community.model';

class pinnedCommunityService {
  static async pinnedCommunities({ userId, communityId }) {
    // 조회
    const findCommunity = await PinnedCommunity.findOne({
      where: { userId, communityId },
    });
    // 내역 있으면 pin 취소삭제
    if (findCommunity) {
      const canceledPin = await PinnedCommunity.destroy({
        where: { userId, communityId },
      });
      findCommunity.dataValues.result = 'Pin has been canceled';
      return findCommunity;
    }
    // 없으면 pin 추가
    const pin = await PinnedCommunity.create({
      userId,
      communityId,
    });
    pin.dataValues.result = 'Pin has been created';
    pin.dataValues.communityId = Number(communityId);

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
