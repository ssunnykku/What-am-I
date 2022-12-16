import { Sequelize, DataTypes } from 'sequelize';

class CommunityPostLike extends Sequelize.Model {
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
          foreignKey: true,
        },
        communityPostId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          validate: {
            isInt: true,
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'communityPostLikes',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  static associate(db) {
    db.ReviewLike.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.ReviewLike.belongsTo(db.CommunityPost, {
        foreignKey: 'communityPostId',
        targetKey: 'id',
      });
  }
}

export { CommunityPostLike };
