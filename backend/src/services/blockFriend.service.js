import { User } from '../models/User.model';

class blockFriendService {
  static async addBlockList({ userId, friendId }) {
    const user = await User.findOne({ where: { userId: friendId } });
    // 차단버튼을 누르면 친구 리스트에서 삭제되고 차단 리스트에 추가되야함

    await user.addBlocked(userId);
  }
}

export { blockFriendService };
