import { communityService } from '../services/community.service';

const communityController = {
  getCommunityList: async (req, res, next) => {
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
  },

  createCommunity: async (req, res, next) => {
    const userId = req.currentUserId;
    const { name, communtyImage, introduction } = req.body;
    try {
      const createCommunity = await communityService.createCommunity(
        userId,
        name,
        communtyImage,
        introduction,
      );
      res.status(201).json(createCommunity);
    } catch (err) {
      next(err);
    }
  },
};

export { communityController };
