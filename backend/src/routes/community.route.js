import { Router } from 'express';
import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityRouter = Router();

communityRouter.get('/', loginRequired, communityController.getCommunityList);
communityRouter.post('/', loginRequired, communityController.createCommunity);
// community.get('/currentuser', communityController.getCurrentUserCommunity);
communityRouter.put(
  '/:communityId',
  loginRequired,
  communityController.updateCommunity,
);

communityRouter.delete(
  '/:communityId',
  loginRequired,
  communityController.deleteCommunity,
);

export { communityRouter };
