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
// import UserCommunity from './UserCommunity.model';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;
db.Like = Like;
// db.Community = Community;
// db.CommunityPost = CommunityPost;

User.init(sequelize);
Session.init(sequelize);
Like.init(sequelize);

//리뷰
Review.init(sequelize);
RevComment.init(sequelize);
//커뮤니티
Community.init(sequelize);
CommunityPost.init(sequelize);
// CommunityImage.init(sequelize);
// CommunityComment.init(sequelize);

// //외래키 오류나서 일단 주석처리
// User.associate(db);
// Review.associate(db);
// RevComment.associate(db);

export { db, Community, CommunityPost, CommunityImage, CommunityComment };
