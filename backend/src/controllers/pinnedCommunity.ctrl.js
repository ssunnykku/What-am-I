import { pinnedCommunityService } from '../services/pinnedCommunity.service';

class pinnedCommunityController {
  static async pinCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;
      const pinnedCommunity = await pinnedCommunityService.pinnedCommunities({
        userId,
        communityId,
      });
      return res.status(201).json(pinnedCommunity);
    } catch (error) {
      next(error);
    }
  }

  //pin 설정한 communities 가져오기
  static async findPinedData(req, res, next) {
    try {
      const userId = req.currentUserId;
      const pinnedCommunities = await pinnedCommunityService.getCommunities({
        userId,
      });
      return res.status(200).json(pinnedCommunities);
    } catch (error) {
      next(error);
    }
  }
}

export { pinnedCommunityController };
