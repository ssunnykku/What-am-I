import { Sequelize, DataTypes } from 'sequelize';

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        images: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'reviews',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.User);
  }
};
