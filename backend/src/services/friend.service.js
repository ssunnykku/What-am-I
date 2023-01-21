import { User } from '../models/User.model';

class friendService {
  static async findFriend({ userId, friendId }) {
    const user = await User.findOne({ where: { userId: friendId } });
    // friends 테이블에 userId:userId, friendId:friendId인 row가 있으면
    // 에러메세지!!
    // const friend = await user.getFriend();
    // console.log(friend);
    // 추가할 때 차단목록에 있으면, errorMessage 보내주기 (차단해제해야 할수있다~) 혹은 차단해제 하시겠습니까? -> yes 하면 차단해제 후 친구 추가?
    await user.addFriendList(userId);
  }
  static async addBlockList({ userId, friendId }) {
    const user = await User.findOne({ where: { userId: friendId } });
    // 차단버튼을 누르면 친구 리스트에서 삭제되고 차단 리스트에 추가되야함

    await user.addBlocked(userId);
  }
}

export { friendService };
