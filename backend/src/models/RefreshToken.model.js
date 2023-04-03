import { Sequelize, DataTypes } from 'sequelize';

class RefreshToken extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        refreshToken: {
          type: DataTypes.STRING,
        },
        userId: {
          type: DataTypes.UUID,
          foreignKey: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'refreshTokens',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  // static associate(db) {
  //   db.RefreshToken.belongTo(db.User, {
  //     foreignKey: 'userId',
  //     targetKey: 'userId',
  //   });
  // }
}

export { RefreshToken };
