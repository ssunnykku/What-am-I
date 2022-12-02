import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import { User } from './User.model';
import { Session } from './Session.model';
import { Review } from './Review.model.js';
import { ReviewComment } from './ReviewComment.model.js';

import { Like } from './Like.model';
import { Community } from './Community.model';
import { CommunityPost } from './CommunityPost.model';
import { CommunityImage } from './CommunityImage.model';
import { CommunityComment } from './CommunityComment.model';
// import UserCommunity from './UserCommunity.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.Like = Like;
db.ReviewComment = ReviewComment;
// db.Community = Community;
// db.CommunityPost = CommunityPost;

User.init(sequelize);
Session.init(sequelize);
Review.init(sequelize);
Like.init(sequelize);
ReviewComment.init(sequelize);

User.associate(db);
Review.associate(db);
ReviewComment.associate(db);

export { db };
