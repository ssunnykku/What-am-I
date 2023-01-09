import { Router } from 'express';
import { pinnedCommunityController } from '../controllers/pinnedCommunity.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const pinnedCommunityRouter = Router();

// pin 기능
pinnedCommunityRouter.post(
  '/pinnedcommunities/:communityId',
  loginRequired,
  pinnedCommunityController.pinCommunity,
);

pinnedCommunityRouter.get(
  '/pinedcommunities',
  loginRequired,
  pinnedCommunityController.findPinedData,
);

export { pinnedCommunityRouter };
