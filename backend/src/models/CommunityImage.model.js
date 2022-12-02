import { Sequelize, DataTypes } from 'sequelize';

class CommunityImage extends Sequelize.Model {
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
        communityId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: DataTypes.STRING(500),
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
}

export { CommunityImage };
