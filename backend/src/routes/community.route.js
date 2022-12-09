import { Router } from 'express';
import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityRouter = Router();
const upload = uploadImageS3();

communityRouter.post(
  '/',
  loginRequired,
  upload.single('communityImage'),
  communityController.addCommunity,
);

communityRouter.get(
  '/posts/:communityId',
  loginRequired,
  communityController.getOne,
);

communityRouter.get('/', loginRequired, communityController.getCommunityList);

communityRouter.get(
  '/best',
  loginRequired,
  communityController.getBestCommunities,
);

communityRouter.get(
  '/posts',
  loginRequired,
  communityController.getCommunitiesAndPosts,
);

communityRouter.put(
  '/:communityId',
  loginRequired,
  upload.single('communityImage'),
  communityController.updateCommunity,
);
communityRouter.delete(
  '/:communityId',
  loginRequired,
  communityController.deleteCommunity,
);

communityRouter.get(
  '/search',
  loginRequired,
  communityController.getFoundCommunities,
);

export { communityRouter };
