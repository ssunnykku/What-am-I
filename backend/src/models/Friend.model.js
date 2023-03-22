import { Sequelize, DataTypes } from 'sequelize';

class Friend extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        friendOrBlockStatus: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'friends',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Friend.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      // 요 as 설정을 해주어야 어느 속성을 외래키로 설정할지 알 수 있음!!
      as: 'UserFriends',
    });
    db.Friend.belongsTo(db.User, {
      foreignKey: 'friendId',
      sourceKey: 'userId',
      as: 'FriendList',
    });
  }
}

export { Friend };
