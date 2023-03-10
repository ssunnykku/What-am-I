import { Sequelize, DataTypes } from 'sequelize';

class BlockedFriend extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'blockedFriends',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Friend.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
    db.Friend.belongsTo(db.User, {
      foreignKey: 'blockedFriendId',
      sourceKey: 'userId',
    });
  }
}

export { BlockedFriend };
