import { userService } from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { loginRequired } from '../middlewares/loginRequired.js';

// import Joi from 'joi';

class userController {
  static async register(req, res) {
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
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.findUser({ email, password });
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      res.status(201).send(user);
    } catch (error) {
      console.log();
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
  static async userList(req, res) {
    try {
      const users = await userService.users();
      if (users.errorMessage) {
        throw new Error(users.errorMessage);
      }
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  static async current(req, res) {
    try {
      // jwt 이용 id로 사용자 찾기
      const userId = req.currentUserId;

      const user = await userService.getUser({ userId });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      res.status(200).send(user);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
}

export { userController };
