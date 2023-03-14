import { User } from '../models/User.model';
import { Friend } from '../models/Friend.model';
import dotenv from 'dotenv';

dotenv.config();

class friendService {
  // 1. 친구목록 추가 /차단
  static async findFriend({ userId, friendId, status }) {
    // userId, friendId 같은거 있는지 확인, 있으면 있던거 삭제
    const findFriend = await Friend.findOne({
      where: { userId, friendId },
    });

    if (findFriend) {
      await Friend.destroy({ where: { userId, friendId } });
    }

    const addedFriend = await Friend.create({
      userId,
      friendId,
      status: Number(status),
    });
    addedFriend.dataValues.message =
      'Successfully added the user to the friendList ';

    return addedFriend;
  }
  // 2. 친구 목록 가져오기, 페이지네이션 20개씩 // 이거 괜찮은지 한번 얘기 해보기..
  static async findFriends({ userId, defaultPage }) {
    const getFriends = await Friend.findAll({
      where: { userId, status: 1 },
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
      include: {
        model: User,
        attributes: ['userId', 'nickname', 'profileImg'],
        order: [['nickname', 'DESC']],
      },
    });

    // const user = await User.findOne({ where: { userId } });

    // const getFriends = await user.getUserFriends({
    //   where: { status: 1 },
    //   attributes: ['userId', 'nickname', 'profileImg'],
    //   order: [['nickname', 'DESC']],
    //   offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
    //   limit: +process.env.FRIENDLIST_PER_PAGE,
    // });

    return getFriends;
  }

  // 3. 나를 추가한 친구 보기(followers) // 수정 해야됨..
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
  // 4. 친구 삭제/ 차단목록에서 삭제
  static async findDeleteFriend({ userId, friendId }) {
    const deleteOne = await Friend.destroy({
      where: { userId, friendId },
    });
    return deleteOne;
  }
}

export { friendService };
