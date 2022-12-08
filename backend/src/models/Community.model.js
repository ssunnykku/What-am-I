import { Sequelize, DataTypes } from 'sequelize';

class Community extends Sequelize.Model {
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter a name',
            },
          },
        },
        introduction: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter an introduction',
            },
          },
        },
        communityImage: {
          type: DataTypes.STRING,
          // defaultValue:
          //   'https://scontent.cdnsnapwidget.com/vp/4aefafd3bee59d1d0fa2b29a59fc2bc5/5D7701C4/t51.2885-15/sh0.08/e35/s640x640/47690229_1430752333723397_2893005724802088960_n.jpg',
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
        tableName: 'communities',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
  static associate(db) {
    db.Community.hasMany(db.CommunityPost, {
      foreignKey: 'communityId',
      sourceKey: 'id',
    }),
      db.Community.belongsTo(db.User, {
        foreignKey: 'userId',
        targetKey: 'userId',
      });
    db.Community.hasMany(db.CommunityLike, {
      foreignKey: 'communityId',
      targetKey: 'id',
    });
  }
}

export { Community };
