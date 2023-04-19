import io from 'socket.io';
import { communityChatService } from '../services/communityChat.service.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { CommunityChat } from '../models/CommunityChat.model.js';

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

    socket.on('join', ({ roomName: roomId, userId: userId }) => {
      socket.join(roomId);

      // socketServer
      //   .to(room)
      //   .emit('onConnect', console.log(`${nickname} 님이 입장하셨습니다.`));
      socket.on('onSend', async (messageItem) => {
        // const msg = messageItem.msg;
        // await CommunityChat.create({
        //   roomId,
        //   userId,
        //   message: messageItem.msg,
        // });
        // onReceive의 용도가 무엇인지? db에 저장해놨다가 보내주는 것과 비교해보면?
        socketServer.to(roomId).emit('onReceive', messageItem);
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
