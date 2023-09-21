import { Router } from 'express';
import { pinnedCommunityController } from '../controllers/pinnedCommunity.ctrl.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const pinnedCommunityRouter = Router();

// pin 기능
pinnedCommunityRouter.post(
  '/pinnedcommunities/:communityId',
  loginRequired,
  pinnedCommunityController.pinCommunity,
);

// 로그인한 사용자의 pin 정보
pinnedCommunityRouter.get(
  '/pinedcommunities',
  loginRequired,
  pinnedCommunityController.findPinedData,
);

export { pinnedCommunityRouter };
