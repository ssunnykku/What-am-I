import { Sequelize, DataTypes } from 'sequelize';

class Block extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        tableName: 'blocks',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Block.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.Block.belongsTo(db.User, {
        foreignKey: 'blockId',
        targetKey: 'userId',
      });
  }
}

export { Block };
