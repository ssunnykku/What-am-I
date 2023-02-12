import { Sequelize, DataTypes } from 'sequelize';

class Block extends Sequelize.Model {
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
        tableName: 'blocks',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
}

export { Block };
