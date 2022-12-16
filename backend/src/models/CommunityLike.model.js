import { Sequelize, DataTypes } from 'sequelize';

class CommunityLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
        communityId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          validate: {
            isInt: true,
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'communityLikes',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.CommunityLike.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.CommunityLike.belongsTo(db.Community, {
        foreignKey: 'communityId',
        targetKey: 'id',
      });
  }
}

export { CommunityLike };
