import { myPageService } from '../services/user.service.js';

class myPageController {
  static async getMyCommunities(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getCommunities = await myPageService.UserToCommunity({ userId });
      if (getCommunities.errorMessage) {
        return new Error(getCommunities.errorMessage);
      }
      return res.status(200).send(getCommunities);
    } catch (error) {
      next(error);
    }
  }
}

export { myPageController };
