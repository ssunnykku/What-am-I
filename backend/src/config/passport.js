import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import User from '../models/User.model';
import dotenv from 'dotenv';

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy,
  ExtractJwt = passportJWT.ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy((email, password, done) => {
    return User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user || !password) {
          // done = 내보낼 결과
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }
        // user가 있음
        return done(null, user, { message: 'Logged In Successfully' });
      })
      .catch((err) => done(err));
  }),
);

// 쿠키 빼오기
let cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
    console.log('Token: ', token);
    return token;
  }
};

// passport.use(
//   new JWTStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.id }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//         // or you could create a new account
//       }
//     });
//   }),
// );

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    console.log('test');
    try {
      // payload id 값으로 유저의 데이터를 조회
      console.log('jwt: ', jwtPayload);
      const user = await User.findOne({
        where: {
          id: jwtPayload.id,
        },
      });
      if (user) {
        console.log('User: ', user);
        done(null, user);
        return;
      }

      done(null, false, { message: '올바르지 않은 인증정보입니다.' });
    } catch (error) {
      console.log('Error: ', error);
      done(error);
    }
  }),
);

// 최초
// passport.use(
//   new JWTStrategy(
//     {
//       jwtFormRequest: cookieExtractor,
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     async function (jwtPayload, done) {
//       console.log('test');
//       try {
//         // payload id 값으로 유저의 데이터를 조회
//         console.log('jwt: ', jwtPayload);
//         const user = await User.findOne({
//           where: {
//             id: jwtPayload.id,
//           },
//         });
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
