// import passport from 'passport';
// import passportJWT from 'passport-jwt';
// import passportKakao from 'passport-kakao';
// import dotenv from 'dotenv';
// import User from '../models/User.model';

// dotenv.config();

// import bcrypt from 'bcrypt';
// import Local from 'passport-local';

// const LocalStrategy = Local.Strategy;

// module.exports = () => {
//   passport.use(
//     new LocalStrategy(
//       {
//         // 프론트 form 속성의 각 name값
//         usernameField: 'email',
//         passwordField: 'password',
//       },
//       // done에 따라 성공 실패를 보여줄 수 있다.
//       async function (username, password, done) {
//         console.log('LocalStrategy', username, password);
//         const findUser = await User.findOne({ where: { email: username } });
//         // console.log('맞니?', username);
//         if (findUser) {
//           console.log(1);
//           const result = await bcrypt.compare(password, findUser.password);
//           if (result) {
//             console.log(2); //
//             return done(null, findUser);
//           } else {
//             console.log(3); // 비번틀림
//             return done(null, false, {
//               message: 'Incorrect password',
//             });
//           }
//         } else {
//           console.log(4); // email 틀림
//           return done(null, false, {
//             message: 'Incorrect username',
//           });
//         }
//       },
//     ),
//   );

//   const JWTStrategy = passportJWT.Strategy;
//   const ExtractJWT = passportJWT.ExtractJwt;

//   passport.use(
//     new JWTStrategy(
//       {
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.JWT_SECRET,
//       },
//       async function (jwtPayload, done) {
//         return User.findOne({ where: { userId: jwtPayload.userId } })
//           .then((user) => {
//             return done(null, user);
//           })
//           .catch((err) => {
//             return done(err);
//           });
//       },
//     ),
//   );

//   const KakaoStrategy = passportKakao.Strategy;

//   const kakaoConfig = {
//     clientID: process.env.KAKAO_ID,
//     callbackURL: '/login',
//   };

//   const kakaoVarify = async (accessToken, refreshToken, profile, done) => {
//     try {
//       const exUser = await User.findOne({
//         where: { snsId: profile.id, provider: 'kakao-login' },
//       });
//       if (exUser) {
//         done(null, exUser);
//       } else {
//         console.log(profile);
//         // const userInfo = JSON.parse(profile._raw);
//         // const kakaoAccount = userInfo.kakao_account;
//         // const kakaoEmail = kakaoAccount.email;

//         // const newUser = await User.create({

//         // })
//         done(null, profile);
//         return;
//       }
//     } catch (error) {
//       done(error);
//     }
//   };

//   // passport.use('kakao-login', new KakaoStrategy(kakaoConfig, kakaoVarify));
// };
