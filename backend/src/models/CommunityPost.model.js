import sequelize from '../config/sequelize';
import { DataTypes } from 'sequelize';

const CommunityPost = sequelize.define(
  'communityPost',
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'communityPosts',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default CommunityPost;
