import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import User from './User.model';
import Session from './Session.model';
import Review from './Review.model.js';
import RevComment from './RevComment.model.js';

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
db.RevComment = RevComment;

User.init(sequelize);
Session.init(sequelize);
Like.init(sequelize);

// //리뷰
// Review.init(sequelize);
// RevComment.init(sequelize);
//커뮤니티
Community.init(sequelize);

// User.associate(db);
// Review.associate(db);
// RevComment.associate(db);

export { db, Community, CommunityPost, CommunityImage, CommunityComment };
