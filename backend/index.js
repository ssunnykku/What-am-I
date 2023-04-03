const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const sockets = [];

io.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';
  console.log('Connected to Browser ✅');

  socket.on('nickname', (msg) => {
    console.log('nickname: ' + msg);
    io.emit('nickname', msg);
  });

  socket.on('chat message', (msg) => {
    console.log('chat message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('close', () => {
    console.log('Disconnected from the Browser ❌');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
