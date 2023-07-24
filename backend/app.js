import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import { logger } from './src/config/logger';

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
import { aiSearchResultRouter } from './src/routes/aiSearchResult.route';

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
app.use(aiSearchResultRouter);
app.use(friendRouter);

// app.get('/api/data', (req, res) => {
//   // API 요청을 보낼 URL 설정
//   const apiUrl =
//     'http://openapi.seoul.go.kr:8088/4371424f4f737375373970566e594d/xml/TbViewGisArisu/1/5/';

//   // Axios를 사용하여 API 요청 보내기
//   axios
//     .get(apiUrl)
//     .then((response) => {
//       // API 요청이 성공한 경우
//       const data = response.data;

//       // 받은 데이터를 클라이언트로 전송
//       res.json(data);
//     })
//     .catch((error) => {
//       // API 요청이 실패한 경우
//       console.error(error);

//       // 에러 메시지를 클라이언트로 전송
//       res.status(500).json({ error: 'API 요청에 실패했습니다.' });
//     });
// });

app.use(errorMiddleware);

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
