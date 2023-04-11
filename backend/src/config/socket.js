import io from 'socket.io';

const socketConfig = (httpServer) => {
  const socketServer = io(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  socketServer.on('connect', (socket) => {
    socket.on('test', (req) => {
      console.log(req);
    });
  });
};

export { socketConfig };
