import JWT from 'passport-jwt';

import User from '../../models/User.model';
const JWTStrategy = JWT.Strategy;

module.exports = (passport) => {
  let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['token'];
      console.log('Token: ', token);
      return token;
    }
  };
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.cookieExtractor(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async function (jwtPayload, done) {
        console.log('test');
        try {
          // payload id 값으로 유저의 데이터를 조회
          console.log('jwt: ', jwtPayload);
          const user = await User.findOne({ where: { id: jwtPayload.id } });
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
      },
    ),
  );
};
