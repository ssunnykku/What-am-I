import { userService } from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { logger } from '../config/winston';

class userController {
  static async register(req, res, next) {
    try {
      // logger.info('POST /users');
      const { nickname, email, password, checkPassword } = req.body;
      const newUser = await userService.addUser({
        nickname,
        email,
        password,
        checkPassword,
      });

      if (newUser.errorMessage) {
        throw new Error(newUser, errorMessage);
      }
      return res.status(201).json(newUser);
    } catch (error) {
      logger.error('POST /users (Error)');
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      // logger.info('POST, /users/login');
      const { email, password } = req.body;

      const user = await userService.findUser({ email, password });
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      return res.status(201).send(user);
    } catch (error) {
      logger.error('POST, /users/login(Error)');
      next(error);
    }
  }
  static async userList(req, res, next) {
    try {
      // logger.info('GET, /users');
      const users = await userService.users();
      if (users.errorMessage) {
        throw new Error(users.errorMessage);
      }
      return res.status(200).send(users);
    } catch (error) {
      logger.error('GET, /users (Error)');
      next(error);
    }
  }

  static async current(req, res, next) {
    try {
      // logger.info('GET, /users/current');
      // jwt 이용 id로 사용자 찾기
      const userId = req.currentUserId;

      const user = await userService.getUser({ userId });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      return res.status(200).send(user);
    } catch (error) {
      logger.error('GET, /users/current (Error)');
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      // logger.info('PUT, /users/:userId');
      const userId = req.params.userId;
      console.log(userId);

      // 수정할 사용자 정보
      const { nickname, password } = req.body ?? null;

      const updatedUser = await userService.setUser({
        userId,
        nickname,
        password,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      logger.error('PUT, /users/:userId (Error)');
      next(error);
    }
  }
  static async setImage(req, res, next) {
    try {
      // logger.info('PATCH, /users/:userId/image');
      const userId = req.params.userId;
      const image = req.file.path;
      // console.log(req.file);
      const PORT = process.env.SEVER_PORT;
      const profileImg = `http://localhost:${PORT}/${image}`;

      await userService.updateImage({
        profileImg,
        userId,
      });

      if (image === undefined) {
        res
          .status(400)
          .send({ success: false, message: '이미지가 존재하지 않습니다.' });
      }
      return res.status(200).send({
        success: true,
        message: '이미지가 저장되었습니다.',
        userId,
        profileImg,
      });
    } catch (error) {
      logger.error('PATCH, /users/:userId/image (Error)');
      next(error);
    }
  }
  static async select(req, res, next) {
    try {
      // logger.info('GET, /users/:userId');
      const userId = req.params.userId;
      const findUser = await userService.findUserId({ userId });
      return res.status(200).send(findUser);
    } catch (error) {
      logger.error('GET, /users/:userId (Error)');
      next(error);
    }
  }
}

export { userController };
