import { friendService } from '../services/friend.service';

class friendController {
  static async addFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      await friendService.findFriend({
        userId,
        friendId,
      });
      return res.status(201).send({
        userId: userId,
        friendId: friendId,
        message: 'Successfully add the user to friendList ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export { friendController };
