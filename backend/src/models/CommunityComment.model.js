import { Sequelize, DataTypes } from 'sequelize';

module.exports = class CommunityComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        communityComment: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'communityComments',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
