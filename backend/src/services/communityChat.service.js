import { db } from '../models/index.js';

class communityChatService {
  // db에 저장
  static async addChat({ roomId, message, userId }) {
    const createChat = await db.CommunityChat.create({
      roomId,
      message,
      userId,
    });
    return createChat;
  }

  // 2. content 내용 가져오기
}

export { communityChatService };
