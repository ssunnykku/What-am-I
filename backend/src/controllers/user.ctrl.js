import { userService } from '../services/userService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';
// import Joi from 'joi';
dotenv.config();

const userController = {
  register: async (req, res) => {
    try {
      const { nickname, email, password } = req.body;
      const newUser = await userService.addUser({
        nickname,
        email,
        password,
      });

      if (newUser.errorMessage) {
        throw new Error(newUser, errorMessage);
      }
      res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.getUser({ email, password });
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      res.status(201).send(user);
    } catch (error) {
      console.log();
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  // login: (req, res) => {
  //   passport.authenticate('local', { session: false }, (err, user, info) => {
  //     if (err || !user) {
  //       return res.status(400).json({
  //         result: 'error',
  //         message: 'Something is not right',
  //       });
  //     }

  //     req.login(user, { session: false }, (err) => {
  //       if (err) {
  //         console.log('Error AuthRouter: ', err);
  //         return res.status(400).send({ message: err });
  //       }

  // 로그인 성공시 jwt 키 생성
  // 테스트코드
  // const secretKey = process.env.JWT_SECRET_KEY || 'secret-key'; // login 성공시 key값을 써서 토큰 생성
  // const token = jwt.sign(
  //   { userId: user.userId, role: user.role },
  //   secretKey,
  //   {
  //     expiresIn: '7d',
  //   },
  // );
  // res.status(200).json({
  //   token,
  //   userId: user.userId,
  //   role: user.role,
  // });
  // 이거임
  //         const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
  //         return res.status(200).json({ user, token });
  //       });
  //     })(req, res);
  //   },
};

export { userController };
