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
    });
    db.Friend.belongsTo(db.User, {
      foreignKey: 'friendId',
      sourceKey: 'userId',
    });
  }
}

export { Friend };
