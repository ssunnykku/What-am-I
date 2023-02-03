import { userService } from '../services/user.service.js';
import { registerValidator } from '../middlewares/userValidator';
import jwt from 'jsonwebtoken';

class userController {
  // 회원가입
  static async register(req, res, next) {
    try {
      const { nickname, email, password, checkPassword } =
        await registerValidator.validateAsync(req.body);

      const newUser = await userService.addUser({
        nickname: nickname,
        email: email,
        password: password,
        checkPassword: checkPassword,
      });

      if (newUser.errorMessage) {
        throw new Error(newUser, errorMessage);
      }
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  // 로그인
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await userService.findUser({ email, password });
      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      return res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
  // 전체 가입자 목록
  static async userList(req, res, next) {
    try {
      const users = await userService.users();

      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
  // 현재 로그인한 user 정보
  static async current(req, res, next) {
    try {
      // jwt 이용 id로 사용자 찾기
      const userId = req.currentUserId;

      const user = await userService.getUser({ userId });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  // 회원정보 수정
  static async edit(req, res, next) {
    try {
      const userId = req.params.userId;

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
      next(error);
    }
  }
  // 프로필 이미지 업로드
  static async setImage(req, res, next) {
    try {
      const userId = req.params.userId;
      // const profileImg = req.file.transforms[0].location;
      const profileImg = req.file.location;
      if (req.file === undefined) {
        res
          .status(400)
          .send({ success: false, message: '이미지가 존재하지 않습니다.' });
      }
      await userService.updateImage({
        profileImg,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: '이미지가 저장되었습니다.',
        userId,
        profileImg,
      });
    } catch (error) {
      next(error);
    }
  }
  // 특정 userId의 정보 가져오기
  static async select(req, res, next) {
    try {
      const userId = req.currentUserId;
      const findUser = await userService.findUserId({ userId });
      return res.status(200).send(findUser);
    } catch (error) {
      next(error);
    }
  }
  // 회원 탈퇴
  static async withdrawal(req, res, next) {
    try {
      const userId = req.currentUserId;
      const findUser = await userService.withdrawalUser({ userId });
      if (findUser.errorMessage) {
        throw new Error(findUser.errorMessage);
      }
      return res
        .status(200)
        .send({ success: true, message: '탈퇴가 완료되었습니다.' });
    } catch (error) {
      next(error);
    }
  }
  // 로그아웃
  static async logOut(req, res, next) {
    try {
      const userId = req.currentUserId;

      const findRefreshToken = await userService.deleteRefreshToken({ userId });
      return res.status(205).send(findRefreshToken);
    } catch (error) {
      next(error);
    }
  }
  // 토큰 만료 검증
  static async verifyToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      const verifyRefreshToken = await userService.checkToken({ refreshToken });
      if (verifyRefreshToken.errorMessage) {
        throw new Error(verifyRefreshToken, errorMessage);
      }
      return res.status(201).send(verifyRefreshToken);
    } catch (error) {
      next(error);
    }
  }
}

export { userController };
