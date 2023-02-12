import { User } from '../models/User.model';
import { db } from '../models/index';
import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
db.Sequelize = Sequelize;
db.sequelize = sequelize;

class friendService {
  static async findFriend({ userId, friendId }) {
    sequelize;
    const user = await User.findOne({ where: { userId: friendId } });
    const findFriendList = await db.sequelize.models.Friends.findOne({
      where: {
        friendId,
      },
    });
    // if (findFriendList) {
    //   const errorMessage = `이미 등록된 친구임`;
    //   return errorMessage;
    // }
    // const friend = await user.getFriend();
    // console.log(friend);
    // 추가할 때 차단목록에 있으면, errorMessage 보내주기 (차단해제해야 할수있다~) 혹은 차단해제 하시겠습니까? -> yes 하면 차단해제 후 친구 추가?
    // await user.setFriendList(userId);
    const addedFriend = await user.addFriendList(userId);
    return addedFriend;
  }
}

export { friendService };
