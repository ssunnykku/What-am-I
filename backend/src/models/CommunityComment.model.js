import { Sequelize, DataTypes } from 'sequelize';

class CommunityComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          foreignKey: true,
        },
      },
      {
        sequelize,
        tableName: 'communityComments',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityComment.belongsTo(db.CommunityPost, {
      foreignKey: 'communityPostId',
      sourceKey: 'id',
    }),
      db.CommunityComment.belongsTo(db.User, {
        foreignKey: 'userId',
        sourceKey: 'userId',
      });
  }
}

export { CommunityComment };
