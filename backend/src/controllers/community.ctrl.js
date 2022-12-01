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
    const { name, communtyImage, introduction } = req.body;
    try {
      await communityService.createCommunity(name, communtyImage, introduction);
      res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE new community',
      });
    } catch (err) {
      next(err);
    }
  },
};

export { communityController };
