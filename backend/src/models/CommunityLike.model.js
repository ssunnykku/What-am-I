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
          defaultValue: DataTypes.UUIDV4,
          foreignKey: true,
        },
        communityId: {
          foreignKey: true,
          type: DataTypes.INTEGER,
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
