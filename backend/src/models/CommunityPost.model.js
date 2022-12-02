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
        // userId: {
        //   type: DataTypes.UUID,
        //   defaultValue: DataTypes.UUIDV4,
        //   foreignKey: true,
        //   unique: true,
        // },
      },
      {
        sequelize,
        tableName: 'communityPosts',
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityPost.belongsTo(db.Community, {
      foreignKey: 'communityId',
      sourceKey: 'id',
    }),
      db.CommunityPost.belongsTo(db.User, {
        foreignKey: 'userId',
        sourceKey: 'userId',
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
