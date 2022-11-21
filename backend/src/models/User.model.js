import sequelize from '../config/sequelize';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        'https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default User;
