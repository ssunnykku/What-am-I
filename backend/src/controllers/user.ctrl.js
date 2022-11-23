import { userService } from '../services/userService';

const userController = {
  register: async (req, res) => {
    try {
      const { nickname, email, password } = req.body;
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
