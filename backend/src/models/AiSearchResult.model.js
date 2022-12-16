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
          allowNull: true,
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
        // predictId: {
        //   type: DataTypes.INTEGER,
        // },
        // label: {
        //   type: DataTypes.STRING,
        // },
        // score: {
        //   type: DataTypes.STRING,
        // },
        // rank: {
        //   type: DataTypes.INTEGER,
        // },
      },
      {
        sequelize,
        tableName: 'aiSearchResults',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.AiSearchResult.hasOne(db.Review, {
      foreignKey: 'aiResultId',
      targetKey: 'id',
    });
    db.AiSearchResult.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
    db.AiSearchResult.hasMany(db.Prediction, {
      foreignKey: 'aiResultId',
      targetKey: 'id',
    });
  }
}

export { AiSearchResult };
