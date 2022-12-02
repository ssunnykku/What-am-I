import { Sequelize, DataTypes } from 'sequelize';

class ChatLog extends Sequelize.Model {
  static init(sequelize) {
    ChatLog.init(
      {
        contents: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        logDate: DataTypes.DATETIME,
        logTime: DataTypes.DATETIME,
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'chatLogs',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
}

export { ChatLog };
