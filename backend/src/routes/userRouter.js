import { Router } from 'express';
import { userService } from '../services/userService';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/user/register', async (req, res) => {
  try {
    const nickname = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await userService.addUser({
      nickname,
      email,
      password,
    });

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
