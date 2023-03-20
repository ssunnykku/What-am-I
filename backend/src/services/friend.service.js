import { User } from '../models/User.model';
import { Friend } from '../models/Friend.model';
import dotenv from 'dotenv';
import ApiError from '../utils/ApiError';

dotenv.config();

class friendService {
  // 1. 친구목록 추가 /차단
  static async findFriend({ userId, friendId, friendOrBlockStatus }) {
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
      friendOrBlockStatus: Number(friendOrBlockStatus),
    });
    addedFriend.dataValues.message =
      'Successfully added the user to the friendList ';

    return addedFriend;
  }
  // 2. 친구 목록 가져오기, 페이지네이션 20개씩
  static async findFriends({ userId, defaultPage }) {
    const getFriends = await Friend.findAll({
      where: { userId, friendOrBlockStatus: 1 },
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
      include: {
        model: User,
        attributes: ['userId', 'nickname', 'profileImg'],
        order: [['nickname', 'DESC']],
      },
    });

    return getFriends;
  }

  // 3. 나를 추가한 친구 보기(followers)
  static async getFollowers({ userId, defaultPage }) {
    const followers = await Friend.findAll({
      where: { friendId: userId, friendOrBlockStatus: 1 },
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
      include: {
        model: User,
        attributes: ['userId', 'nickname', 'profileImg'],
        order: [['nickname', 'DESC']],
      },
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
    if (!deleteOne) {
      throw ApiError.setBadRequest(`${friendId} is not on the Friends List`);
      // const errorMessage = `${friendId} is not on the Friends List`;
    }
    return deleteOne;
  }

  /**친구 차단 관련 */

  // 5. 내가 차단한 친구 목록 전체 보기
  static async findBlockedFriends({ userId, defaultPage }) {
    const blockedFriends = await Friend.findAll({
      where: { userId, friendOrBlockStatus: 0 },
      offset: (defaultPage - 1) * +process.env.FRIENDLIST_PER_PAGE,
      limit: +process.env.FRIENDLIST_PER_PAGE,
      include: {
        model: User,
        attributes: ['userId', 'nickname', 'profileImg'],
        order: [['nickname', 'DESC']],
      },
    });

    return blockedFriends;
  }
  /**프로필 정보 하나씩 보기 */

  // 6. 특정 유저의 프로필 정보 보기
  static async getProfile({ friendId, userId }) {
    const getOne = await User.findOne({
      where: {
        userId: friendId,
      },
      attributes: ['email', 'userId', 'nickname', 'profileImg'],
    });

    const isFriend = await Friend.findOne({
      where: {
        friendId,
        userId,
      },
    });
    !!isFriend
      ? (getOne.dataValues.friendStatus = 1)
      : (getOne.dataValues.friendStatus = 0);

    return getOne;
  }
}

export { friendService };
