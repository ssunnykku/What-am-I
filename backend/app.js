import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionMysql from 'express-mysql-session';

//**Router */
import { communityRouter } from './src/routes/community.route';
import { communityPostRouter } from './src/routes/communityPost.route';
import { userRouter } from './src/routes/user.router';
import { reviewRouter } from './src/routes/review.route';
import { reviewCommentRouter } from './src/routes/revComment.route';
import { reviewLikeRouter } from './src/routes/reviewLike.route.js';

import { myPageRouter } from './src/routes/myPage.route';
import { communityLikeRouter } from './src/routes/communityLike.route';

//**middleware */
import errorMiddleware from './src/middlewares/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));
// app.use(cookieParser(process.env.COOKIE_SECRET));

// import passportConfig from './src/utils/passport.js';

// app.use(passport.initialize());
// passportConfig();

// const MySqlStore = sessionMysql(session);
// const options = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER_NAME,
//   password: process.env.DB_USER_PASSWORD,
//   database: process.env.DB_NAME,
//   clearExpired: true,
//   checkExpirationInterval: 10000,
//   expiration: 10000,
// };

// const sessionStore = new MySqlStore(options);

// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//   }),
// );

sequelize.sync({ force: false });

app.use(userRouter);
app.use(communityPostRouter);
app.use(reviewRouter);
app.use(reviewCommentRouter);
app.use(reviewLikeRouter);

app.use('/communities', communityRouter);
app.use(myPageRouter);
app.use(communityLikeRouter);
app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
