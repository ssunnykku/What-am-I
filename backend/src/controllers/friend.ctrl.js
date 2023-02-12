import { friendService } from '../services/friend.service';

class friendController {
  static async addFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      const addFriend = await friendService.findFriend({
        userId,
        friendId,
      });
      // if (addFriend.errorMessage) {
      //   throw new Error(addFriend, errorMessage);
      // }
      return res.status(201).send({
        userId: userId,
        friendId: friendId,
        message: 'Successfully added the user to the friendList ',
      });
    } catch (error) {
      next(error);
    }
  }
}

export { friendController };
