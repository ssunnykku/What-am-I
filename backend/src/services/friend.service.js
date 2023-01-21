import { User } from '../models/User.model';

class friendService {
  static async findFriend({ userId, friendId }) {
    const user = await User.findOne({ where: { userId: friendId } });
    // friends 테이블에 userId:userId, friendId:friendId인 row가 있으면
    // 에러메세지!!
    // const friend = await user.getFriend();
    // console.log(friend);
    await user.addFriend(userId);
  }
}

export { friendService };
