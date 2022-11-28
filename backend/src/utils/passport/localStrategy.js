import bcrypt from 'bcrypt';
import Local from 'passport-local';

import User from '../../models/User.model';
const LocalStrategy = Local.Strategy;

module.exports = (passport) => {
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
};
