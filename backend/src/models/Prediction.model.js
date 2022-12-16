import { Sequelize, DataTypes } from 'sequelize';

class Prediction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        label: {
          type: DataTypes.STRING,
        },
        score: {
          type: DataTypes.INTEGER,
        },
        rank: {
          type: DataTypes.INTEGER,
        },
        aiResultId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'predictions',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Prediction.belongsTo(db.AiSearchResult, {
      foreignKey: 'aiResultId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export { Prediction };
