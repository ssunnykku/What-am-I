import { friendService } from '../services/friend.service';

class friendController {
  // 친구 추가
  static async addFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      const addFriend = await friendService.findFriend({
        userId,
        friendId,
      });
      return res.status(201).send(addFriend);
    } catch (error) {
      next(error);
    }
  }

  static async getFollowings(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friends = await friendService.findFriends({
        userId,
      });
      return res.status(200).send(friends);
    } catch (error) {
      next(error);
    }
  }
}

export { friendController };
