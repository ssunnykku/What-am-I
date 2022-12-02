import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import { User } from './User.model';
import { Session } from './Session.model';
import { Review } from './Review.model.js';
import { ReviewComment } from './ReviewComment.model.js';

import { Like } from './Like.model';
import { Community } from './Community.model';
import { CommunityPost } from './CommunityPost.model';
import { CommunityComment } from './CommunityComment.model';
import { CommunityLike } from './CommunityLike.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.Like = Like;
db.ReviewComment = ReviewComment;
db.Community = Community;
db.CommunityPost = CommunityPost;
db.CommunityComment = CommunityComment;
db.CommunityLike = CommunityLike;

User.init(sequelize);
Session.init(sequelize);
Review.init(sequelize);
Like.init(sequelize);
ReviewComment.init(sequelize);
Community.init(sequelize);
CommunityPost.init(sequelize);
CommunityComment.init(sequelize);
CommunityLike.init(sequelize);

Community.associate(db);
CommunityPost.associate(db);
CommunityComment.associate(db);
User.associate(db);
CommunityLike.associate(db);
Review.associate(db);
ReviewComment.associate(db);

export { db };
