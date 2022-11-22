// import is from '@sindresorhus/is';
import { Router } from 'express';
import { userService } from '../services/userService';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/user/register', async (req, res) => {
  try {
    // if (is.emptyObject(req.body)) {
    //   throw new Error(
    //     'header의 Content-Type을 application/json으로 설정해주세요',
    //   );
    // }

    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await userService.addUser({
      nickname,
      email,
      password,
    });
    console.log('라우터', newUser);

    if (newUser.errorMessage) {
      throw new Error(newUser, errorMessage);
      // console.log(newUser.errorMessage);
    }
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

export { userAuthRouter };
