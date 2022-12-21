import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import http from 'http';
import https from 'https';
import fs from 'fs';

//**Router */
import { communityRouter } from './src/routes/community.route';
import { communityPostRouter } from './src/routes/communityPost.route';
import { communityCommentRouter } from './src/routes/communityComment.route';
import { communityPostLikeRouter } from './src/routes/communityPostLike.route';

import { userRouter } from './src/routes/user.router';
import { reviewRouter } from './src/routes/review.route';
import { reviewCommentRouter } from './src/routes/reviewComment.route';
import { reviewLikeRouter } from './src/routes/reviewLike.route.js';

import { myPageRouter } from './src/routes/myPage.route';
import { communityLikeRouter } from './src/routes/communityLike.route';
import { aiSearchResultRouter } from './src/routes/aiSearchResult.route';

//**middleware */
import errorMiddleware from './src/middlewares/error';

dotenv.config();
const app = express();

const httpPort = 80;
const httpsPort = 5001;

// HTTPS 서버
https.createServer(credentials, app).listen(process.env.SEVER_PORT, () => {
  console.log(`HTTPS: Express listening on port ${process.env.SEVER_PORT}`);
});

// HTTP 서버
app.listen(process.env.HTTP_PORT, () => {
  console.log(`HTTP: Express listening on port ${process.env.HTTP_PORT}`);
});

const privateKey = fs.readFileSync(process.env.PRIVATEKEY);
const certificate = fs.readFileSync(process.env.CERTIFICATE);
const ca = fs.readFileSync(process.env.CA);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

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

app.use(aiSearchResultRouter);

app.use(errorMiddleware);
