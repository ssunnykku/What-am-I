import io from 'socket.io';
import { communityChatService } from '../services/communityChat.service.js';
import { loginRequired } from '../middlewares/loginRequired.js';
// import { CommunityChat } from '../models/CommunityChat.model.js';

const socketConfig = (httpServer) => {
  const socketServer = io(httpServer, {
    // const socketServer = io.of('msg')
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

    // 해야할 것
    // 채팅 내용 저장하기
    // 채팅 내용 가져오기

    // let joinStatus = [];
    // joinStatus.forEach((one)=>{
    //   if (roomId)
    // })
    socket.on('join', ({ roomName: roomId, userId: userId }) => {
      socket.join(roomId);

      // socketServer
      //   .to(room)
      //   .emit('onConnect', console.log(`${nickname} 님이 입장하셨습니다.`));
      socket.on('onSend', async (messageItem) => {
        console.log(messageItem);
        console.log(roomId);
        socketServer.to(roomId).emit('onReceive', messageItem);
        await communityChatService.addChat({
          roomId: roomId,
          message: messageItem.msg,
          userId: messageItem.userId,
        });
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
