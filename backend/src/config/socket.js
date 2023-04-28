import io from 'socket.io';
import { communityChatService } from '../services/communityChat.service.js';
import { loginRequired } from '../middlewares/loginRequired.js';
// import { CommunityChat } from '../models/CommunityChat.model.js';

const socketConfig = (httpServer) => {
  const socketServer = io(httpServer, {
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

    // let joinStatus = [];
    // joinStatus.forEach((one)=>{
    //   if (roomId)
    // })
    socket.on('join', async ({ roomName: roomId, userId: userId }) => {
      socket.join(roomId);

      // socketServer
      //   .to(room)
      //   .emit('onConnect', console.log(`${nickname} 님이 입장하셨습니다.`));

      // socket.emit('chatLog', chatData);

      socket.on('onSend', async (messageItem) => {
        // db에 채팅 메세지 저장
        await communityChatService.addChat({
          roomId: roomId,
          message: messageItem.msg,
          userId: messageItem.userId,
        });

        let lastMessages = [];
        // 저장된 메세지 내역 가져오기
        const chatData = await communityChatService.getChat({
          roomId,
        });

        await chatData.forEach((chat) => {
          // console.log(chat.User);
          // lastMessages.push({
          //   nickname: chat.User.dataValues.nickname,
          //   msg: chat.dataValues.message,
          //   profile: chat.User.dataValues.profileImg,
          // });
        });
        // console.log(lastMessages);
        socketServer.to(roomId).emit('onReceive', lastMessages);
      });

      socket.on('disconnect', () => {
        socket.leave(roomId);
        // socketServer
        //   .to(room)
        //   .emit(
        //     'onDisconnect',
        //     console.log(`${nickname} 님이 퇴장하셨습니다`),
        //   );
      });
    });
  });
};

export { socketConfig };
