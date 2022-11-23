import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import User from './User.model';
import Review from './Review.model.js';
import RevComment from './RevComment.model.js';

import Like from './Like.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.Like = Like;
db.RevComment = RevComment;

User.init(sequelize);
Review.init(sequelize);
Like.init(sequelize);
RevComment.init(sequelize);

User.associate(db);
Review.associate(db);
RevComment.associate(db);

export { db };
