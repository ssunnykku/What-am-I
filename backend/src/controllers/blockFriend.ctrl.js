import { blockFriendService } from '../services/blockFriend.service';

class blockFriendController {
  static async blockFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      await blockFriendService.addBlockList({
        userId,
        friendId,
      });
      return res.status(201).send({
        userId: userId,
        friendId: friendId,
        message: 'Successfully added the user to the blockList ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export { blockFriendController };
