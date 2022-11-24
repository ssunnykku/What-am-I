import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import sequelize from './src/config/sequelize';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportSet from './src/config/passport';
import session from 'express-session';
import errorMiddleware from './src/middlewares/error';
// router
import { userAuthRouter } from './src/routes/user.router';
import { reviewAuthRouter } from './src/routes/review.route';
import { revCommentAuthRouter } from './src/routes/revComment.route';

dotenv.config();

const app = express();

app.use(
  session({
    resave: false,
    // saveUninitialized: false,
    secret: 'team08',
    // cookie: {
    //   httpOnly: true,
    //   secure: false,
    // },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());

sequelize.sync({ force: false });
app.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.send('Team08 Backend');
    } catch (error) {
      next(error);
    }
  },
);

app.use(userAuthRouter);
app.use(reviewAuthRouter);
app.use(revCommentAuthRouter);

app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
