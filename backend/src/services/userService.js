import User from '../models/User.model.js';
// import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class userService {
  static async addUser({ nickname, email, password }) {
    // const user = await UserController.findByUserEmail({ email });

    // if (user) {
    //   const errorMessage = '사용중인 이메일입니다.';
    //   return { errorMessage };
    // }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db에 저장
    const createdNewUser = await User.create({
      nickname,
      email,
      password: hashedPassword,
    });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }
}

export { userService };
