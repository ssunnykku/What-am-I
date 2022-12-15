import { communityPostLikeService } from '../services/communityPostLike.service.js';

class communityPostLikeController {
  static async addLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityPostId = req.params.communityPostId;
      const findcommunityPostLike = await communityPostLikeService.addlike({
        userId,
        communityPostId,
      });
      return res.status(201).json(findcommunityPostLike);
    } catch (error) {
      next(error);
    }
  }
}

export { communityPostLikeController };
