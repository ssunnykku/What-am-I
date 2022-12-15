import { Router } from 'express';
import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityRouter = Router();
const upload = uploadImageS3();

// 1. 커뮤니티 만들기
communityRouter.post(
  '/communities',
  loginRequired,
  upload.single('communityImage'),
  communityController.addCommunity,
);

// 2. 커뮤니티 1개
communityRouter.get(
  '/communities/posts/:communityId',
  loginRequired,
  communityController.getOne,
);

//전체 커뮤니티 리스트 10개씩
communityRouter.get(
  '/communities',
  loginRequired,
  communityController.getCommunityList,
);

communityRouter.get(
  '/communities/best',
  loginRequired,
  communityController.getBestCommunities,
);

communityRouter.get(
  '/communities/posts',
  loginRequired,
  communityController.getCommunitiesAndPosts,
);

communityRouter.put(
  '/communities/:communityId',
  loginRequired,
  upload.single('communityImage'),
  communityController.updateCommunity,
);
communityRouter.delete(
  '/communities/:communityId',
  loginRequired,
  communityController.deleteCommunity,
);

communityRouter.get(
  '/communities/search',
  loginRequired,
  communityController.getFoundCommunities,
);

export { communityRouter };
