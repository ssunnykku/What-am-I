import sequelize from '../config/sequelize';
import { DataTypes } from 'sequelize';

const CommunityComment = sequelize.define(
  'communityComment',
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'communityComments',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default CommunityComment;
