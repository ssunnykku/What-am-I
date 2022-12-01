import sequelize from '../config/sequelize';
import { DataTypes, Sequelize, Model } from 'sequelize';

class Community extends Model {}

Community.init(
  {
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    communityImage: {
      type: DataTypes.STRING,
      defaultValue:
        'https://scontent.cdnsnapwidget.com/vp/4aefafd3bee59d1d0fa2b29a59fc2bc5/5D7701C4/t51.2885-15/sh0.08/e35/s640x640/47690229_1430752333723397_2893005724802088960_n.jpg',
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'communities',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default Community;
