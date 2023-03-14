import { friendService } from '../services/friend.service';

class friendController {
  //1. 친구 추가하기/차단하기
  static async addFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      const status = req.params.status;

      const addFriend = await friendService.findFriend({
        userId,
        friendId,
        status,
      });

      return res.status(201).send(addFriend);
    } catch (error) {
      next(error);
    }
  }
  // 2. 추가한 친구 보기
  static async getFollowings(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { page } = req.query;
      const defaultPage = page || 1;
      const friends = await friendService.findFriends({
        defaultPage,
        userId,
      });
      return res.status(200).send(friends);
    } catch (error) {
      next(error);
    }
  }
  // 3. 나를 추가한 친구 보기(followers)
  static async getFollowers(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { page } = req.query;
      const defaultPage = page || 1;
      const followers = await friendService.getFollowers({
        defaultPage,
        userId,
      });
      return res.status(200).send(followers);
    } catch (error) {
      next(error);
    }
  }
  // 4. 친구 삭제
  static async deleteFriend(req, res, next) {
    try {
      const userId = req.currentUserId;
      const friendId = req.params.friendId;
      const findFriend = await friendService.findDeleteFriend({
        userId,
        friendId,
      });

      return res.status(200).send({
        userId: userId,
        friendId: friendId,
        message: 'successfully deleted',
      });
    } catch (error) {
      next(error);
    }
  }
}

export { friendController };
