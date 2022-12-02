import { Sequelize, DataTypes } from 'sequelize';

class UserCommunity extends Model {
  static init(sequelize) {
    return super.init(
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
  }
}

export { UserCommunity };
