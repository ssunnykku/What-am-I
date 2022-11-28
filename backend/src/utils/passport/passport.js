import passport from 'passport';
import bcrypt from 'bcrypt';
import Local from 'passport-local';
import JWT from 'passport-jwt';
import local from './localStrategy';
import User from '../../models/User.model';

module.exports = (app) => {
  // const LocalStrategy = Local.Strategy;

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

  local(passport);

  return passport;
};
