import { blockFriendService } from '../services/blockFriend.service';

class blockFriendController {
  static async blockFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const blockedFriendId = req.params.friendId;
      await blockFriendService.addBlockList({
        userId,
        blockedFriendId,
      });
      return res.status(201).send({
        userId: userId,
        blockedFriendId: blockedFriendId,
        message: 'Successfully added the user to the blockList ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export { blockFriendController };
