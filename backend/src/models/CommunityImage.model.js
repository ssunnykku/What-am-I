import { Sequelize, DataTypes } from 'sequelize';

module.exports = class CommunityImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        communityImage: {
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
      },
      {
        sequelize,
        tableName: 'communityImages',
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
};
