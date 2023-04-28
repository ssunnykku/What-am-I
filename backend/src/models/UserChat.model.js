import { Sequelize, DataTypes } from 'sequelize';

class UserChat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'chatLogs',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.UserChat.bringsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
}

export { UserChat };
