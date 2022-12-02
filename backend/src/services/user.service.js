import { User } from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userService {
  static async addUser({ nickname, email, password, checkPassword }) {
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      const errorMessage = '사용중인 이메일입니다.';
      return { errorMessage };
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

    const secretKey = process.env.JWT_SECRET || 'secret-key';
    const token = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: '7d',
    });

    const userId = user.userId;
    const nickname = user.nickname;
    const loginUser = {
      token,
      userId,
      email,
      nickname,
      errorMessage: null,
    };

    return loginUser;
  }

  static async users() {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
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
    // return user;
    return user;
  }

  static async setUser({ userId, nickname, password }) {
    const user = await User.findOne({ where: { userId: userId } });

    if (!user) {
      const errorMessage = `Cannot find information`;
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
}
export { userService };
