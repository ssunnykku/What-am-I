import Sequelize from 'sequelize';

import sequelize from '../config/sequelize.js';
import { User } from './User.model.js';
import { RefreshToken } from './RefreshToken.model.js';
import { Review } from './Review.model.js';
import { ReviewComment } from './ReviewComment.model.js';

import { ReviewLike } from './ReviewLike.model.js';
import { Community } from './Community.model.js';
import { CommunityPost } from './CommunityPost.model.js';
import { CommunityPostLike } from './CommunityPostLike.model.js';
import { CommunityComment } from './CommunityComment.model.js';
import { CommunityLike } from './CommunityLike.model.js';
import { PinnedCommunity } from './PinnedCommunity.model.js';
import { CommunityChat } from './CommunityChat.model.js';
import { UserCommunity } from './UserCommunity.model.js';
import { UserChat } from './UserChat.model.js';

import { Friend } from './Friend.model.js';

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
db.CommunityChat = CommunityChat;
db.UserCommunity = UserCommunity;
db.UserChat = UserChat;

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
CommunityChat.init(sequelize);
UserCommunity.init(sequelize);
UserChat.init(sequelize);

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
CommunityChat.associate(db);
UserCommunity.associate(db);

// console.log(db);

export { db };
