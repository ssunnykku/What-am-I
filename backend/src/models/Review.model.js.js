import { Sequelize, DataTypes } from 'sequelize';

class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          foreignKey: true,
          type: DataTypes.INTEGER,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        aiResultId: {
          type: Sequelize.INTEGER,
          foreignKey: true,
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
      targetKey: 'userId',
    });
    db.Review.hasMany(db.ReviewComment, {
      foreignKey: 'reviewId',
      targetKey: 'id',
    });
    db.Review.hasMany(db.ReviewLike, {
      foreignKey: 'reviewId',
      targetKey: 'id',
    });
    db.Review.belongsTo(db.AiSearchResult, {
      foreignKey: 'aiResultId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  }
}

export { Review };
