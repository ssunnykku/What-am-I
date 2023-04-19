import { CommunityChat } from '../models/CommunityChat.model';

class communityChatService {
  // db에 저장
  static async addChat({ roomId, msg, userId }) {
    const createChat = await CommunityChat.create({
      roomId,
      message: msg,
      userId,
    });
  }

  // 2. content 내용 가져오기
}

export { communityChatService };
