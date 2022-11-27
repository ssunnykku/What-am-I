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
import passportLocal from './src/utils/passport/passport';
import auth from './src/utils/passport/auth';

//**Router */
import { communityRouter } from './src/routes';
import { authRouter } from './src/routes/auth.router';
import { userRouter } from './src/routes/user.router';
import { reviewAuthRouter } from './src/routes/review.route';
import { revCommentAuthRouter } from './src/routes/revComment.route';
//**middleware */
import errorMiddleware from './src/middlewares/error';

dotenv.config();

const app = express();

app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(compression());
const MySqlStore = sessionMysql(session);
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 10000,
  expiration: 10000,
};

const sessionStore = new MySqlStore(options);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  }),
);
app.use(flash());

// session 다음에 passport가 와야 함
const passport = passportLocal(app);

app.post(
  '/auth/login_process',
  passport.authenticate('local', {
    successRedirect: '/', // 성공시
    failureRedirect: '/login', // 실패 시 재진입
    failureFlash: true,
    successFlash: true,
  }),
);

// 로그인 전송했을 때 passport가 그 로그인 데이터를 처리하기 위한 코드
app.get('/', async (req, res, next) => {
  console.log('/', req.user);
  // const flashMsg = req.flash();
  try {
    auth.status(req, res);
    return res.send('Team08 Backend');
  } catch (error) {
    next(error);
  }
});
sequelize.sync({ force: false });

app.use(userRouter);
app.use(authRouter);
app.use(reviewAuthRouter);
app.use(revCommentAuthRouter);

app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
