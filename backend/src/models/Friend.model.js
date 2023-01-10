import { Sequelize, DataTypes } from 'sequelize';

class Friend extends Sequelize.Model {
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
        tableName: 'friends',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Friend.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.Friend.belongsTo(db.User, {
        foreignKey: 'followingId',
        targetKey: 'userId',
      });
  }
}

export { Friend };
