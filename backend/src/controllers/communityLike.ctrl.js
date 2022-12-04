import { communityLikeService } from '../services/communityLike.service';

class communityLikeController {
  static async addLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const findUser = await communityLikeService.findUser({ userId });
    } catch (error) {
      next(error);
    }
  }
}

export { communityLikeController };
