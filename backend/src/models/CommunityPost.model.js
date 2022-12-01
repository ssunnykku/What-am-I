import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityPost extends Model {}

CommunityPost.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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

export default CommunityPost;
