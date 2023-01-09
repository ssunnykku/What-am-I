import { Sequelize, DataTypes } from 'sequelize';

class PinnedCommunity extends Sequelize.Model {
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
        timestamps: false,
        tableName: 'pinnedCommunities',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.PinnedCommunity.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    }),
      db.PinnedCommunity.belongsTo(db.Community, {
        foreignKey: 'communityId',
        targetKey: 'id',
      });
  }
}

export { PinnedCommunity };
