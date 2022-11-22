import User from './User.model';
import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

export { db };
