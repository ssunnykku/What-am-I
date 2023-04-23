import express from 'express';
import db from './src/models/index';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import { logger } from './src/config/logger';
import http from 'http';

import { socketConfig } from './src/config/socket.js';

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

dotenv.config();

const app = express();

const httpServer = http.createServer(app).listen(3500);

socketConfig(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });

// app.use(morgan('combined'));

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

// app.use(index);
app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
