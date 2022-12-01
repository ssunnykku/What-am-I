import { Router } from 'express';

import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityRouter = Router();

communityRouter.get('/community', communityController.getCommunityList);
communityRouter.post('/community', communityController.createCommunity);

export { communityRouter };
