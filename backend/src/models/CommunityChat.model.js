import { Sequelize, DataTypes } from 'sequelize';

class CommunityChat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        roomId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          validate: {
            isInt: true,
          },
        },
        message: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'communityChat',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    // db.CommunityChat.belongsTo(db.UserCommunity, {
    //   foreignKey: 'userId',
    //   targetKey: 'userId',
    // }),
    db.CommunityChat.belongsToMany(db.User, {
      through: 'usersChat',
      as: 'Writers',
      foreignKey: 'id',
    }),
      db.CommunityChat.belongsTo(db.Community, {
        foreignKey: 'roomId',
        targetKey: 'id',
      });
  }
}

export { CommunityChat };
