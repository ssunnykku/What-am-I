import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import { logger } from './src/config/logger';
import http from 'http';
// import socketIo from 'socket.io';
// import index from './src/routes/index.js';
import io from 'socket.io';

const httpServer = http.createServer(app).listen(3000);

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

//**Router */
import { communityRouter } from './src/routes/community.route';
import { communityPostRouter } from './src/routes/communityPost.route';
import { communityCommentRouter } from './src/routes/communityComment.route';
import { communityPostLikeRouter } from './src/routes/communityPostLike.route';
import { pinnedCommunityRouter } from './src/routes/pinnedCommunity.route';

import { userRouter } from './src/routes/user.router';
import { reviewRouter } from './src/routes/review.route';
import { reviewCommentRouter } from './src/routes/reviewComment.route';
import { reviewLikeRouter } from './src/routes/reviewLike.route.js';

import { myPageRouter } from './src/routes/myPage.route';
import { communityLikeRouter } from './src/routes/communityLike.route';

import { friendRouter } from './src/routes/friend.route';

//**middleware */
import errorMiddleware from './src/middlewares/error';
import axios from 'axios';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });

app.use(userRouter);
app.use(communityPostRouter);
app.use(reviewRouter);
app.use(reviewCommentRouter);
app.use(reviewLikeRouter);

app.use(communityRouter);
app.use(myPageRouter);
app.use(communityLikeRouter);
app.use(communityCommentRouter);
app.use(communityPostLikeRouter);
app.use(pinnedCommunityRouter);
app.use(friendRouter);

app.use(index);

app.use(errorMiddleware);

// const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = (socket) => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit('FromAPI', response);
// };
// server.listen(port, () => console.log(`Listening on port ${port}`));

// 왜 모든 url에서 에러가?
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   logger.info('Hello, Winston logger, some info!');
//   logger.error('Error message');
//   next(error);
// });

app.listen(process.env.SEVER_PORT, () =>
  logger.info(`✅ Listening to port 5001`),
);
