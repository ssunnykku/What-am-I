import express from 'express';
import { db } from './src/models/index.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize.js';
import path from 'path';
import { fileURLToPath } from 'url';

import { logger } from './src/config/logger.js';
import http from 'http';
import { socketConfig } from './src/config/socket.js';

//**Router */
import { communityRouter } from './src/routes/community.route.js';
import { communityPostRouter } from './src/routes/communityPost.route.js';
import { communityCommentRouter } from './src/routes/communityComment.route.js';
import { communityPostLikeRouter } from './src/routes/communityPostLike.route.js';
import { pinnedCommunityRouter } from './src/routes/pinnedCommunity.route.js';

import { userRouter } from './src/routes/user.router.js';
import { reviewRouter } from './src/routes/review.route.js';
import { reviewCommentRouter } from './src/routes/reviewComment.route.js';
import { reviewLikeRouter } from './src/routes/reviewLike.route.js';

import { myPageRouter } from './src/routes/myPage.route.js';
import { communityLikeRouter } from './src/routes/communityLike.route.js';

import { friendRouter } from './src/routes/friend.route.js';

//**middleware */
import errorMiddleware from './src/middlewares/error.js';
import axios from 'axios';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });

app.use(morgan('combined'));

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

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);

// const httpServer = http
//   .createServer(app)
//   .listen(process.env.SOCKETIO_SERVER_PORT);

// socketConfig(httpServer);
