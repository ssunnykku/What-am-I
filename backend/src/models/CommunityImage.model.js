import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityImage extends Model {}

CommunityImage.init(
  {
    images: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'communityImages',
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default CommunityImage;
