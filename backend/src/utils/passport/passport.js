import passport from 'passport';
import bcrypt from 'bcrypt';
import Local from 'passport-local';
import JWT from 'passport-jwt';

import User from '../../models/User.model';

module.exports = function (app) {
  const LocalStrategy = Local.Strategy;
  const JWTStrategy = JWT.Strategy;

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
    User.findOne({ where: { email: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
    // done(null, findUser);
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
      async function (username, password, done) {
        console.log('LocalStrategy', username, password);
        const findUser = await User.findOne({ where: { email: username } });
        // console.log('맞니?', username);
        if (findUser) {
          console.log(1);
          const result = await bcrypt.compare(password, findUser.password);
          if (result) {
            console.log(2); //
            return done(null, findUser);
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

  // // 쿠키를 빼오는(?) 함수
  // let cookieExtractor = (req) => {
  //   let token = null;
  //   if (req && req.cookies) {
  //     token = req.cookies['token'];
  //     console.log('Token: ', token);
  //     return token;
  //   }
  // };

  // // JWT 전략
  // passport.use(
  //   new JWTStrategy(
  //     {
  //       jwtFromRequest: cookieExtractor,
  //       secretOrKey: process.env.JWT_SECRET,
  //     },
  //     async function (jwtPayload, done) {
  //       console.log('test');
  //       try {
  //         // payload id 값으로 유저의 데이터를 조회
  //         console.log('jwt: ', jwtPayload);
  //         const user = await User.findOne({ where: { id: jwtPayload.id } });
  //         if (user) {
  //           console.log('User: ', user);
  //           done(null, user);
  //           return;
  //         }

  //         done(null, false, { message: '올바르지 않은 인증정보입니다.' });
  //       } catch (error) {
  //         console.log('Error: ', error);
  //         done(error);
  //       }
  //     },
  //   ),
  // );

  return passport;
};
