import { Sequelize, DataTypes } from 'sequelize';

class AiSearchResult extends Sequelize.Model {
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
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          foreignKey: true,
        },
        reviewId: {
          type: Sequelize.INTEGER,
          foreignKey: true,
        },
        dogName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter a name',
            },
          },
        },
        aiResult: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter an introduction',
            },
          },
        },
        aiImage: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter images',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'aiSearchResults',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.AiSearchResult.belongsTo(db.Review, {
      foreignKey: 'reviewId',
      sourceKey: 'id',
    });
    db.AiSearchResult.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
  }
}

export { AiSearchResult };
