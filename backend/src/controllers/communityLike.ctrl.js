import { communityLikeService } from '../services/communityLike.service';

class communityLikeController {
  static async addLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;
      const getLike = await communityLikeService.addHeart({
        userId,
        communityId,
      });

      if (getLike.errorMessage) {
        throw new Error(getLike.errorMessage);
      }
      return res.status(201).json(getLike);
    } catch (error) {
      next(error);
    }
  }
}

export { communityLikeController };
