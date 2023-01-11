import { Sequelize, DataTypes } from 'sequelize';

class BlockList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        tableName: 'blockLists',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.BlockList.belongsTo(db.User, {
      foreignKey: 'blockId',
      targetKey: 'userId',
    });
  }
}

export { BlockList };
