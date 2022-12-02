import { Sequelize, DataTypes } from 'sequelize';

class Session extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        session_id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        expires: {
          type: DataTypes.STRING,
        },
        data: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'sessions',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
}

export { Session };
