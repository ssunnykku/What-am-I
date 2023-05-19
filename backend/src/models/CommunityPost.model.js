import { Sequelize, DataTypes } from 'sequelize';

class CommunityPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          foreignKey: true,
          type: DataTypes.INTEGER,
        },
        images: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        communityId: {
          foreignKey: true,
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: 'communityPosts',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityPost.belongsTo(db.Community, {
      foreignKey: 'communityId',
      targetKey: 'id',
      // onDelete: 'CASCADE',
    }),
      db.CommunityPost.belongsTo(db.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
      }),
      db.CommunityPost.hasMany(db.CommunityComment, {
        foreignKey: 'communityPostId',
        sourceKey: 'id',
      }),
      db.CommunityPost.hasMany(db.CommunityPostLike, {
        foreignKey: 'communityPostId',
        sourceKey: 'id',
      });
  }
}

export { CommunityPost };
