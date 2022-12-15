import { Router } from 'express';
import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityRouter = Router();
const upload = uploadImageS3();

communityRouter.post(
  '/communities',
  loginRequired,
  upload.single('communityImage'),
  communityController.addCommunity,
);

communityRouter.get(
  '/communities/posts/:communityId',
  loginRequired,
  communityController.getOne,
);

communityRouter.get(
  '/communities/',
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
