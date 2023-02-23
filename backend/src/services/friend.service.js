import { User } from '../models/User.model';
import { Friend } from '../models/Friend.model';

class friendService {
  static async findFriend({ userId, friendId }) {
    const user = await User.findOne({ where: { userId: friendId } });

    // 추가할 때 차단목록에 있으면, errorMessage 보내주기 (차단해제해야 할수있다~) 혹은 차단해제 하시겠습니까? -> yes 하면 차단해제 후 친구 추가?
    // await user.setFriendList(userId);
    const addedFriend = await user.addFriendList(userId);
    const findFriendList = await Friend.findOne({
      where: {
        friendId,
      },
    });
    findFriendList.dataValues.message =
      'Successfully added the user to the friendList ';
    return findFriendList;
  }

  static async findFriends({ userId }) {
    const user = await User.findOne({ where: { userId: userId } });

    const getFriends = await user.getUserFriends({
      attributes: ['userId', 'nickname', 'profileImg'],
    });

    return getFriends;
  }
}

export { friendService };
