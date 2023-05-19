import { UserManager } from 'discord.js';
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

  // 2. content 내용 가져오기(해당 room의 게시물 전부!)
  static async getChat({ roomId }) {
    // const query = `Select * from communnityChat`;
    const getData = await db.CommunityChat.findAll({
      where: { roomId },
      include: [
        {
          model: db.User,
          attribute: ['userId', 'roomId', 'message', 'prifileImg', 'nickname'],
        },
      ],
    });

    return getData;
  }
}

export { communityChatService };
