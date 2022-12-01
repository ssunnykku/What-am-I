import { Router } from 'express';

import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityRouter = Router();

communityRouter.get(
  '/community',
  loginRequired,
  communityController.getCommunityList,
);
communityRouter.post(
  '/community',
  loginRequired,
  communityController.createCommunity,
);
communityRouter.put(
  '/community/:communityId',
  loginRequired,
  communityController.updateCommunity,
);

export { communityRouter };

// 커뮤니티 외래키
// alter table communities add foreign key( userId ) references users(userId) on delete cascade;
// alter table communityComments add foreign key( userId ) references users(userId) on delete cascade;
// alter table communityComments add foreign key( communityId ) references communities( communityId ) on delete cascade;

// alter table communityImages add foreign key( userId ) references users(userId) on delete cascade;
// alter table communityImages add foreign key( communityId ) references communities( communityId ) on delete cascade;

// alter table communityPosts add foreign key( userId ) references users(userId) on delete cascade;
// alter table communityPosts add foreign key( communityId ) references communities( communityId ) on delete cascade;
