import { Server } from 'socket.io';
import { communityChatService } from '../services/communityChat.service.js';
import { loginRequired } from '../middlewares/loginRequired.js';
// import { CommunityChat } from '../models/CommunityChat.model.js';

const socketConfig = (httpServer) => {
  const socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // emit : 보내주기, on : 받기
  socketServer.on('connection', (socket) => {
    // onAny : 미들웨어, 어느 이벤트에서든지 console.log를 할 수 있다.
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });
    // 토큰 인증 코드 구현하기

    socket.on('join', async ({ roomName: roomId, userId: userId }) => {
      socket.join(roomId);

      socket.on('onSend', async (messageItem) => {
        // db에 채팅 메세지 저장
        await communityChatService.addChat({
          roomId: roomId,
          message: messageItem.msg,
          userId: messageItem.userId,
        });

        let lastMessages = [];
        // 해당 room의 저장된 메세지 내역 가져오기, 프론트로 보내줌!
        const chatData = await communityChatService.getChat({
          roomId,
        });

        await chatData.forEach((chat) => {
          lastMessages.push({
            nickname: chat.User.dataValues.nickname,
            msg: chat.dataValues.message,
            profile: chat.User.dataValues.profileImg,
          });
        });

        socketServer.to(roomId).emit('onReceive', lastMessages);
      });

      socket.on('disconnect', () => {
        socket.leave(roomId);
      });
    });
  });
};
/// socket.io로 DB에 저장되어도 되는지? 로그인 했는지 어떻게 검증할건지? 인가??
// socket.io logging

export { socketConfig };
