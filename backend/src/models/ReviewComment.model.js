import { Sequelize, DataTypes } from 'sequelize';

class ReviewComment extends Sequelize.Model {
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
    db.ReviewComment.belongsTo(db.Review, {
      foreignKey: 'reviewId',
      sourceKey: 'reviewId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
  static associate(db) {
    db.ReviewComment.belongsTo(db.User, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export { ReviewComment };
