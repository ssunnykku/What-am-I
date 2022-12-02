import { Sequelize, DataTypes } from 'sequelize';

class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: true,
        tableName: 'likes',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.User, {
      foreignKey: 'likeId',
      targetKey: 'userId',
    });
  }
}

export { Like };
