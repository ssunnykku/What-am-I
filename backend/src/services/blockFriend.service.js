import { BlockedFriend } from '../models/BlockedFriend.model';

class blockFriendService {
  static async addBlockList({ userId, blockedFriendId }) {
    const getFriend = await BlockedFriend.create({
      userId,
      blockedFriendId,
    });
    return getFriend;
  }
}

export { blockFriendService };
