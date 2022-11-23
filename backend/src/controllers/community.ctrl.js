import { communityService } from '../services';

export default {
  async getCommunityList(req, res, next) {
    const { page } = req.query;

    try {
      const communityCount = await communityService.countCommunityPage();
      const selectedCommunities = await communityService.selectCommunities(
        page,
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET community list',
        result: { communityCount, selectedCommunities },
      });
    } catch (err) {
      next(err);
    }
  },
  async addCommunity(req, res, next) {},
};
