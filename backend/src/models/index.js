import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

import { User } from './User.model';
import { RefreshToken } from './RefreshToken.model';
import { Review } from './Review.model.js';
import { ReviewComment } from './ReviewComment.model.js';

import { ReviewLike } from './ReviewLike.model';
import { Community } from './Community.model';
import { CommunityPost } from './CommunityPost.model';
import { CommunityPostLike } from './CommunityPostLike.model';
import { CommunityComment } from './CommunityComment.model';
import { CommunityLike } from './CommunityLike.model';
import { PinnedCommunity } from './PinnedCommunity.model';

import { Friend } from './Friend.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.ReviewLike = ReviewLike;
db.ReviewComment = ReviewComment;
db.Community = Community;
db.CommunityPost = CommunityPost;
db.CommunityComment = CommunityComment;
db.CommunityLike = CommunityLike;
db.CommunityPostLike = CommunityPostLike;
db.PinnedCommunity = PinnedCommunity;
db.Friend = Friend;

User.init(sequelize);
RefreshToken.init(sequelize);
Review.init(sequelize);
ReviewLike.init(sequelize);
ReviewComment.init(sequelize);
Community.init(sequelize);
CommunityPost.init(sequelize);
CommunityComment.init(sequelize);
CommunityLike.init(sequelize);
CommunityPostLike.init(sequelize);
PinnedCommunity.init(sequelize);
Friend.init(sequelize);

Community.associate(db);
CommunityPost.associate(db);
CommunityComment.associate(db);
CommunityPostLike.associate(db);
CommunityLike.associate(db);
User.associate(db);
Review.associate(db);
ReviewComment.associate(db);
ReviewLike.associate(db);
PinnedCommunity.associate(db);
Friend.associate(db);

export { db };
