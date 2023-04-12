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
    socket.on('nickname', (nickname) => {
      socket['nickname'] = nickname;
    });
    // onAny : 미들웨어, 어느 이벤트에서든지 console.log를 할 수 있다.
    socket.onAny((event) => {
      console.log(`Socket Event: ${event}`);
    });
    socket.on('enter_room', (roomName, done) => {
      // console.log(socket.rooms);
      // 방 만들어주기(join)
      socket.join(roomName);
      // console.log(socket.rooms);
      done();
      socket.to(roomName).emit('welcome', socket.nickname);
    });

    socket.on('disconnecting', () => {
      socket.rooms.forEach((room) =>
        socket.to(room).emit('bye', socket.nickname),
      );
    });

    socket.on('new_message', (msg, room, done) => {
      socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
      done();
    });
  });
};

export { socketConfig };
