import { Sequelize, DataTypes } from 'sequelize';

class UserCommunity extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        ownerId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        communityId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          validate: {
            isInt: true,
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'userCommunities',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.UserCommunity.belongsTo(db.User, {
      foreignKey: 'ownerId',
      targetKey: 'userId',
    }),
      db.UserCommunity.belongsTo(db.Community, {
        foreignKey: 'communityId',
        targetKey: 'id',
      });
  }
}

export { UserCommunity };
