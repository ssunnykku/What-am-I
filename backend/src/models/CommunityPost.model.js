import { Sequelize, DataTypes } from 'sequelize';

class CommunityPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        images: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
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
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityPost.belongsTo(db.Community, {
      foreignKey: 'communityId',
      targetKey: 'id',
    }),
      db.CommunityPost.belongsTo(db.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
      db.CommunityPost.hasMany(db.CommunityComment, {
        foreignKey: 'communityPostId',
        sourceKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
  }
}

export { CommunityPost };
