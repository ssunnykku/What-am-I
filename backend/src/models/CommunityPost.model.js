import { Sequelize, DataTypes } from 'sequelize';

class CommunityPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        images: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'communityPosts',
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityPost.belongsTo(db.Community, {
      foreignKey: 'communityId',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
      db.CommunityPost.belongsTo(db.User, {
        foreignKey: 'userId',
        sourceKey: 'userId',
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
// import sequelize from '../config/sequelize';
// import { DataTypes, Model } from 'sequelize';

// class CommunityPost extends Model {}

// CommunityPost.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       unique: true,
//       primaryKey: true,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'communityPosts',
//     timestamps: true,
//     charset: 'utf8mb4',
//     collate: 'utf8mb4_general_ci',
//   },
// );

// export default CommunityPost;
