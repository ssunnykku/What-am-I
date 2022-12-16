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
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          foreignKey: true,
        },
        aiResultId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        ranking: {
          type: DataTypes.INTEGER,
        },
        predictId: {
          type: DataTypes.INTEGER,
        },
        label: {
          type: DataTypes.STRING,
        },
        score: {
          type: DataTypes.INTEGER,
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
    db.Prediction.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.Prediction.belongsTo(db.AiSearchResult, {
        foreignKey: 'aiResultId',
        targetKey: 'id',
      });
  }
}

export { Prediction };
