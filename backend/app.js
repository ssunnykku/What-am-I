import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionMysql from 'express-mysql-session';

//**Passport */
import passport from 'passport';

//**Router */
import { communityRouter } from './src/routes/community.route';
import { userRouter } from './src/routes/user.router';
import { reviewAuthRouter } from './src/routes/review.route';
import { reviewCommentAuthRouter } from './src/routes/revComment.route';
//**middleware */
import errorMiddleware from './src/middlewares/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

import passportConfig from './src/utils/passport.js';

app.use(passport.initialize());
passportConfig();

sequelize.sync({ force: false });

app.use(userRouter);
// app.use(communityRouter);
// app.use(communityPostRouter);
app.use(reviewAuthRouter);
app.use(reviewCommentAuthRouter);
app.use('/communities', communityRouter);
app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
