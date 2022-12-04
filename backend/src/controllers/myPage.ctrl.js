import { myPageService } from '../services/myPage.service';

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
  static async getCommunityPosts(req, res, next) {
    try {
      const userId = req.currentUserId;
      const myPosts = await myPageService.getMyCommunitiesAndPosts({ userId });
      if (myPosts.errorMessage) {
        return new Error(myPosts.errorMessage);
      }
      return res.status(200).send(myPosts);
    } catch (error) {
      next(error);
    }
  }
}

export { myPageController };
