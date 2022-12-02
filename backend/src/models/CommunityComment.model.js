import { Sequelize, DataTypes } from 'sequelize';

class CommunityComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        communityCommentId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        communityId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: DataTypes.STRING(500),
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
}

export { CommunityComment };
