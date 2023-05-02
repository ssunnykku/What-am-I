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

    // 필요한 것 :  해당 방의 대화 내역과 사용자 정보
    // 먼저 해당 방의 대화 정보 가져오기
    // roomId를 이용해
    // let lastMessages = [];

    // getData.forEach((chat) => {
    //   lastMessages.push({
    //     nickname: chat.User.dataValues.nickname,
    //     msg: chat.dataValues.message,
    //     profile: chat.User.dataValues.profileImg,
    //   });
    // });
    // console.log(getData);
    return getData;
  }
}

export { communityChatService };
