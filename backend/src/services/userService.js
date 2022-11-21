import { UserController } from '../controllers/UserController';
import { v4 as uuidv4 } from 'uuid';
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

    // id 는 유니크 값 부여
    const userId = uuidv4();
    const newUser = { userId, nickname, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await UserController.createUser({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    console.log('서비스', createdNewUser);
    return createdNewUser;
  }
}

export { userService };
