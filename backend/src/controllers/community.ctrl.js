import { communityService } from '../services/community.service';

class communityController {
  //전체 커뮤니티 리스트 10개씩
  static async getCommunityList(req, res, next) {
    try {
      const { page } = req.query;
      const communityCount = await communityService.countCommunityPage();
      const selectedCommunities = await communityService.selectCommunities(
        page,
      );
      if (selectedCommunities.errorMessage) {
        throw new Error(selectedCommunities, errorMessage);
      }
      return res
        .status(200)
        .json({ result: { communityCount, selectedCommunities } });
    } catch (err) {
      next(err);
    }
  }
  //커뮤니티 만들기
  static async createCommunity(req, res, next) {
    const userId = req.currentUserId;
    const { name, communtyImage, introduction } = req.body;
    const createCommunity = await communityService.createCommunity(
      userId,
      name,
      communtyImage,
      introduction,
    );
    res.status(201).json(createCommunity);
  }

  //생성한 커뮤니티 수정하기
  static async updateCommunity(req, res) {
    try {
      const userId = req.currentUserId;

      const communityId = req.params.communityId;
      const { name, communtyImage, introduction } = req.body;

      const updateCommunity = await communityService.updateCommunity({
        name,
        communtyImage,
        introduction,
        communityId,
        userId,
      });

      if (updateCommunity.errorMessage) {
        throw new Error(updateCommunity, errorMessage);
      }

      const message = await communityService.findCommunity({
        communityId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  static async deleteCommunity(req, res) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;

      const deleteCommunity = await communityService.deleteCommunity({
        communityId,
        userId,
      });
      if (deleteCommunity.errorMessage) {
        throw new Error(deleteCommunity, errorMessage);
      }
      return res.status(200).json(deleteCommunity);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
}

export { communityController };
