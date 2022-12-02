import { Sequelize, DataTypes } from 'sequelize';

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter your email',
            },
          },
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter your password',
            },
          },
        },
        nickname: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: 'Please enter your nickname',
            },
          },
        },
        profileImg: {
          type: DataTypes.STRING(2048),
          allowNull: false,
          defaultValue:
            'https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'users',
        underscored: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        paranoid: true,
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Review, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export { User };
