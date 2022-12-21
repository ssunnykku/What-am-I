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

const app = express(); // https
const app2 = express(); // http

const privateKey = fs.readFileSync(__dirname + process.env.PRIVATEKEY, 'utf8');
const certificate = fs.readFileSync(
  __dirname + process.env.CERTIFICATE,
  'utf8',
);
const ca = fs.readFileSync(__dirname + process.env.CA, 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpServer = http.createServer(app2);
const httpsServer = https.createServer(credentials, app);

// 80 port -- http
app2.get('/', (req, res) => {
  console.log('------ http get / -----' + new Date().toLocaleString());
  console.log('req.ip => ' + req.ip);
  console.log('req.hostname => ' + req.hostname);
  console.log(req.url);
  console.log(req.originalUrl);

  res.send('<h1>HTTP Server running on port 80</h1>');
});

// 5000 port -- https
app.get('/', (req, res) => {
  console.log('------ https get / -----' + new Date().toLocaleString());
  console.log('req.ip => ' + req.ip);
  console.log('req.hostname => ' + req.hostname);
  console.log(req.url);
  console.log(req.originalUrl);

  res.send('<h1>HTTPS Server running on port 5001</h1>');
});

httpServer.listen(80, () => {
  console.log(new Date().toLocaleString());
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(process.env.SEVER_PORT, () => {
  console.log(new Date().toLocaleString());
  console.log(`HTTPS -- listening on port ${process.env.SEVER_PORT} ...`);
});

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

// app.listen(process.env.SEVER_PORT, () =>
//   console.log(`✅ Listening to port 5001`),
// );
