import { User } from '../models/User.model';
import { Friend } from '../models/Friend.model';
import dotenv from 'dotenv';

dotenv.config();

class friendService {
  // 1. 친구목록 추가
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
  // 2. 친구 목록 가져오기, 페이지네이션 20개씩
  static async findFriends({ userId, defaultPage }) {
    const user = await User.findOne({ where: { userId: userId } });

    const getFriends = await user.getUserFriends({
      attributes: ['userId', 'nickname', 'profileImg'],
      order: [['nickname', 'DESC']],
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
    });

    return getFriends;
  }

  // 3. 나를 추가한 친구 보기(followers)
  static async getFollowers({ userId, defaultPage }) {
    const user = await User.findOne({ where: { userId: userId } });

    const followers = await user.getFriendList({
      attributes: ['userId', 'nickname', 'profileImg'],
      order: [['nickname', 'DESC']],
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
    });
    // 내가 친구추가 했는지 여부 보여주기
    for (const follower of followers) {
      let friend = follower.dataValues.userId;
      const findFriend = await Friend.findOne({
        where: {
          userId,
          friendId: friend,
        },
      });
      findFriend
        ? (follower.dataValues.friendStatus = 1)
        : (follower.dataValues.friendStatus = 0);
    }

    return followers;
  }
  // 4. 친구 삭제
  static async findDeleteFriend({ userId, friendId }) {
    await Friend.destroy({
      where: { userId, friendId },
    });
    return { result: 'successfully deleted' };
  }
}

export { friendService };
