import { Sequelize, DataTypes } from 'sequelize';

module.exports = class RevComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
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
      sourcekey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
