import { Sequelize, DataTypes } from 'sequelize';

class CommunityComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        communityPostId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
      },
      {
        sequelize,
        tableName: 'communityComments',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityComment.belongsTo(db.CommunityPost, {
      foreignKey: 'communityPostId',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    }),
      db.CommunityComment.belongsTo(db.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
      });
  }
}

export { CommunityComment };
