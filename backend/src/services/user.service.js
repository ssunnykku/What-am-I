import { User } from '../models/User.model.js';
import { RefreshToken } from '../models/RefreshToken.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userService {
  static async addUser({ nickname, email, password, checkPassword }) {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const errorMessage = '사용중인 이메일입니다.';
      return errorMessage;
    }

    if (password !== checkPassword) {
      const errorMessage = '비밀번호가 일치하지 않습니다.';
      return errorMessage;
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db에 저장
    const createdNewUser = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });
    createdNewUser.errorMessage = null;

    // return createdNewUser;
    return `Successfully create a user account`;
  }

  static async findUser({ email, password }) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const errorMessage = '해당 이메일은 가입 내역이 없습니다.';
      return { errorMessage };
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const accessJWTSecretKey = process.env.ACCESS_JWT_SECRET || 'secret-key';
    const refreshJWTSecretKey = process.env.REFRESH_JWT_SECRET || 'secret-key';

    // refreshToken 발급
    const refreshToken = jwt.sign({}, refreshJWTSecretKey, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES,
    });

    // accessToken 발급
    const token = jwt.sign(
      { userId: user.userId, nickname: user.nickname },
      accessJWTSecretKey,
      {
        expiresIn: process.env.ACCESS_JWT_EXPIRES,
      },
    );

    // accessToken 유효일자
    const expJWT = jwt.verify(token, accessJWTSecretKey).exp;

    // 테이블에 저장된 토큰이 있는지 확인
    const find = await RefreshToken.findOne({ where: { userId: user.userId } });

    // refreshToken 만료 여부 확인하기
    // 만료되었다면 수정 저장, 만료아니라면 accessToken 재발행??

    // 데이터가 있으면, refreshToken을 수정 저장
    if (find) {
      await RefreshToken.update(
        { refreshToken },
        {
          where: {
            userId: user.userId,
          },
        },
      );
      return {
        token,
        refreshToken,
        AccessTokenExp: Date(expJWT),
        userId: user.userId,
        email,
        errorMessage: null,
      };
    }
    // 없으면 새로 저장하기
    await RefreshToken.create({ refreshToken, userId: user.userId });

    const userId = user.userId;
    const nickname = user.nickname;
    const loginUser = {
      token,
      refreshToken,
      AccessTokenExp: Date(expJWT),
      userId,
      email,
      nickname,
      errorMessage: null,
    };

    return loginUser;
  }

  static async users() {
    const users = await User.findAll({
      where: { deletedAt: null },
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  static async getUser({ userId }) {
    const user = await User.findOne({
      where: { userId: userId },
      attributes: { exclude: ['password', 'deletedAt'] },
    });

    if (!user) {
      const errorMessage = '가입내역이 없습니다.';
      return { errorMessage };
    }
    return user;
  }

  static async setUser({ userId, nickname, password }) {
    const user = await User.findOne({ where: { userId: userId } });

    if (!user) {
      const errorMessage = `Cannot find user information`;
      return { errorMessage };
    }
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );
    // const hashedPassword = await bcrypt.hash(password, 10);
    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const updateUser = await User.update(
      { nickname },
      {
        where: {
          userId: user.userId,
        },
      },
    );

    return {
      id: user.id,
      userId: user.userId,
      email: user.email,
      nickname: nickname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  static async updateImage({ profileImg, userId }) {
    const user = await User.findOne({ where: { userId: userId } });
    await User.update(
      { profileImg: profileImg },
      {
        where: {
          userId: user.userId,
        },
      },
    );
    return;
  }
  static async findUserId({ userId }) {
    const user = await User.findOne({
      where: { userId: userId },
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  static async withdrawalUser({ userId }) {
    const user = await User.findOne({
      where: { userId: userId },
    });

    if (!user) {
      const errorMessage = `Cannot find user information`;
      return { errorMessage };
    }
    const withdrawalUser = await User.destroy({
      where: { userId: user.userId },
    });
    return withdrawalUser;
  }

  static async deleteRefreshToken({ userId }) {
    const token = await RefreshToken.destroy({
      where: { userId: userId },
    });
    return token;
  }

  static async checkToken({ refreshToken }) {
    const accessJWTSecretKey = process.env.ACCESS_JWT_SECRET || 'secret-key';
    const refreshJWTSecretKey = process.env.REFRESH_JWT_SECRET || 'secret-key';

    // refreshToken이 DB에 있는지 확인
    const findToken = await RefreshToken.findOne({ where: { refreshToken } });
    // 없으면 errorMessage , 다시 로그인하세요
    if (!findToken) {
      const errorMessage = '다시 로그인하세요';
      return errorMessage;
    }
    // 있으면 유효한지 확인
    jwt.verify(
      findToken.refreshToken,
      refreshJWTSecretKey,
      async function (err) {
        if (err) {
          // 유효하지 않으면(만료되었으면) db 삭제, 다시 로그인하세요 errorMessage
          await RefreshToken.destroy({
            where: { refreshToken: findToken.refreshToken },
          });
          const errorMessage = '토큰이 유효하지 않음. 다시 로그인하세요';
          return errorMessage;
        }
      },
    );
    const user = await User.findOne({
      where: { userId: findToken.userId },
    });
    // 유효하면 accessToken 발급
    const token = jwt.sign(
      { userId: findToken.userId, nickname: user.nickname },
      accessJWTSecretKey,
      {
        expiresIn: process.env.ACCESS_JWT_EXPIRES,
      },
    );
    return { result: '재발급 완료', token };
  }
}

export { userService };
