// import { db } from '../models/index';
// import { User } from '../models/User.model';
// import { db } from '../models/User.model';
// const User = db.User;
// const Op = db.Sequelize.Op;
// const User = db.users;
import User from '../models/User.model';

class UserController {
  // static async findByUserEmail({ email }) {
  //   const findUser = await User.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   return findUser;
  // }
  static async createUser({ newUser }) {
    const createdNewUser = await User.create(newUser);
    return createdNewUser;
  }
}

export { UserController };
