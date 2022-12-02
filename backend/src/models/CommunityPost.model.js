import { Sequelize, DataTypes } from 'sequelize';

class CommunityPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        communityPostId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        images: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING(500),
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
        tableName: 'communityPosts',
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
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
