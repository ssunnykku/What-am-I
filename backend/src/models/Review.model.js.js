import { Sequelize, DataTypes } from 'sequelize';

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reviewId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
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
    db.Review.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    db.Review.hasMany(db.RevComment, {
      foreignKey: 'reviewId',
      sourcekey: 'reviewId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
