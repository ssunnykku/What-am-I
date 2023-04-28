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

  // 2. content 내용 가져오기
  static async getChat({ roomId }) {
    // const query = `Select * from communnityChat`;
    const getData = await db.CommunityChat.findAll({
      include: [
        {
          model: db.User,
          as: 'Writers',
          attributes: ['nickname', 'profileImg'],
        },
      ],
    });

    // let lastMessages = [];

    // getData.forEach((chat) => {
    //   lastMessages.push({
    //     nickname: chat.User.dataValues.nickname,
    //     msg: chat.dataValues.message,
    //     profile: chat.User.dataValues.profileImg,
    //   });
    // });
    console.log(getData);
    return getData;
  }
}

export { communityChatService };
