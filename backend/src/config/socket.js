import io from 'socket.io';
import { communityChatService } from '../services/communityChat.service.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const socketConfig = (httpServer) => {
  const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  // emit : 보내주기, on : 받기
  socketServer.on('connection', (socket) => {
    // socket.on('nickname', (nickname) => {
    //   socket['nickname'] = nickname;
    // });
    // onAny : 미들웨어, 어느 이벤트에서든지 console.log를 할 수 있다.
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });

    socket.on(
      'join',
      ({ roomName: room, nickname: nickname, profile: profile }) => {
        socket.join(room);
        // socketServer
        //   .to(room)
        //   .emit('onConnect', console.log(`${nickname} 님이 입장하셨습니다.`));
        socket.on('onSend', (messageItem) => {
          socketServer.to(room).emit('onReceive', messageItem);
        });

        socket.on('disconnect', () => {
          socket.leave(room);
          // socketServer
          //   .to(room)
          //   .emit(
          //     'onDisconnect',
          //     console.log(`${nickname} 님이 퇴장하셨습니다`),
          //   );
        });
      },
    );

    // socket.on('enter_room', (roomName, done) => {
    //   // console.log(socket.rooms);
    //   // 방 만들어주기(join)
    //   // socket.join(roomName);
    //   // console.log(socket.rooms);
    //   done();
    //   socketServer.to(roomName).emit('onConnect', socket.nickname);
    //   // socket.on('onSend', (messageItem) => {
    //   //   socket.to(roomName).emit('onReceive', messageItem);
    //   // });
    // });

    // socket.on('disconnecting', () => {
    //   socket.rooms.forEach((room) =>
    //     socket.to(room).emit('bye', socket.nickname),
    //   );
    // });

    // socket.on('new_message', (msg, room, done) => {
    //   socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    //   done();
    // });
  });
};

export { socketConfig };
