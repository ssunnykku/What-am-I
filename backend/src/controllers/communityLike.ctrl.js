import { communityLikeService } from '../services/communityLike.service';

class communityLikeController {
  static async addLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;
      const findCommunityLike = await communityLikeService.addHeart({
        userId,
        communityId,
      });

      if (findCommunityLike.errorMessage) {
        throw new Error(findCommunityLike.errorMessage);
      }
      return res.status(201).json(findCommunityLike);
    } catch (error) {
      next(error);
    }
  }

  static async cancelLike(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;
      const findCommunityLike = await communityLikeService.cancelCommunityLike({
        userId,
        communityId,
      });

      if (findCommunityLike.errorMessage) {
        throw new Error(findCommunityLike.errorMessage);
      }

      return res.status(200).send({
        communityId,
        success: true,
        message: `Successfully canceled a 'like'`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { communityLikeController };
