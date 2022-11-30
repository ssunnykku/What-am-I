import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';
import User from './user.model';
import Community from './community.model';

class UserCommunity extends Model {}

UserCommunity.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: id,
      },
    },
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: Community,
        key: id,
      },
    },
    owner: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'UserCommunty',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default UserCommunity;
