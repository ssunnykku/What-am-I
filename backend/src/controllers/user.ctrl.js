import { userService } from '../services/userService';
import Joi from 'joi';

const userController = {
  register: async (req, res) => {
    try {
      const { nickname, email, password } = req.body;

      // const schema = Joi.object({
      //   nickname: Joi.string().required,
      //   email: Joi.string().required,
      //   password: Joi.string().required,
      // });

      // await schema.validateAsync({ nickname, email, password });

      const newUser = await userService.addUser({
        nickname,
        email,
        password,
      });
      if (newUser.errorMessage) {
        throw new Error(newUser, errorMessage);
        // console.log(newUser.errorMessage);
      }
      res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
};

export { userController };
