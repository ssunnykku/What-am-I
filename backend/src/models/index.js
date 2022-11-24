import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import User from './User.model';
import Review from './Review.model.js';
import Like from './Like.model';
import Community from './Community.model';
import CommunityPost from './CommunityPost.model';
import CommunityImage from './CommunityImage.model';
import CommunityComment from './CommunityComment.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.Like = Like;

User.init(sequelize);
Review.init(sequelize);
Like.init(sequelize);

User.associate(db);
Review.associate(db);
// join 진행

export { db, Community, CommunityPost, CommunityImage, CommunityComment };
