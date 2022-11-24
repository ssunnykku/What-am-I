import sequelize from '../config/sequelize';
import { DataTypes } from 'sequelize';

const CommunityImage = sequelize.define(
  'communityImage',
  {},
  {
    sequelize,
    timestamps: true,
    tableName: 'communityImages',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default CommunityImage;
