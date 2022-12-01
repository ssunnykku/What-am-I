import { Sequelize, DataTypes } from 'sequelize';

module.exports = class ReviewComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reviewCommentId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        reviewId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: DataTypes.STRING(500),
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'reviewComments',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.RevComment.belongsTo(db.Review, {
      foreignKey: 'reviewId',
      sourcekey: 'reviewId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
  // static associate(db) {
  //   db.RevComment.belongsTo(db.User, {
  //     foreignKey: 'userId',
  //     sourcekey: 'userId',
  //     onDelete: 'cascade',
  //     onUpdate: 'cascade',
  //   });
  // }
};