import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
//**Passport */
import cookieParser from 'cookie-parser';

// import passportSet from './src/config/passport';
import session from 'express-session';
import sessionMysql from 'express-mysql-session';
//**Router */
import { communityRouter } from './src/routes';
import { userAuthRouter } from './src/routes/user.router';
import { userRouter } from './src/routes/user.router';
import { reviewAuthRouter } from './src/routes/review.route';
import { revCommentAuthRouter } from './src/routes/revComment.route';
//**middleware */
import errorMiddleware from './src/middlewares/error';

import auth from './src/utils/auth';
dotenv.config();

const app = express();

app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));
// app.use(cookieParser(process.env.COOKIE_SECRET));

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

// session 다음에 passport가 와야 함
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import User from './src/models/User.model';

const authData = {
  email: 'a22ddl@naver.com',
  password: 'aaAAxdA!@',
};
// passport를 설치한 것
app.use(passport.initialize());
// session 미들웨어를 활용해 그 위에서 동작함
app.use(passport.session());

// 세션을 처리하는 방법에 대한 얘기
passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user.email);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser', id);
  done(null, authData);
});

// 로그인 성공/실패 조건
passport.use(
  new LocalStrategy(
    {
      // 프론트 form 속성의 각 name값
      usernameField: 'email',
      passwordField: 'password',
    },
    // done에 따라 성공 실패를 보여줄 수 있다.
    function (username, password, done) {
      console.log('LocalStrategy', username, password);
      if (username === authData.email) {
        console.log(1);
        if (password === authData.password) {
          console.log(2); //
          return done(null, authData);
        } else {
          console.log(3); // 비번틀림
          return done(null, false, {
            message: 'Incorrect password',
          });
        }
      } else {
        console.log(4); // email 틀림
        return done(null, false, {
          message: 'Incorrect username',
        });
      }
    },
  ),
);

app.post(
  '/users/login',
  passport.authenticate('local', {
    successRedirect: '/', // 성공시
    failureRedirect: '/users/login', // 실패 시 재진입
  }),
);

// 로그인 전송했을 때 passport가 그 로그인 데이터를 처리하기 위한 코드
app.get('/', async (req, res, next) => {
  auth.status(req, res);
  try {
    console.log('/', req.user);
    return res.send('Team08 Backend');
  } catch (error) {
    next(error);
  }
});
sequelize.sync({ force: false });

// app.use(userRouter);
app.use(reviewAuthRouter);
app.use(revCommentAuthRouter);

app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
