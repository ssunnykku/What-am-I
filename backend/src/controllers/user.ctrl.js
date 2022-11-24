import { userService } from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';
// import Joi from 'joi';
dotenv.config();

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
      console.log('이메일', email);

      const user = await userService.getUser({ email, password });
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
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
}

export { userController };
