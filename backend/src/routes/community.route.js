import { Router } from 'express';
import { communityController } from '../controllers/community.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityRouter = Router();
const upload = uploadImageS3();

communityRouter.post('/', loginRequired, communityController.addCommunity);
communityRouter.put(
  '/image/:id',
  loginRequired,
  upload.single('communityImage'),
  communityController.communityImage,
);
// communityRouter.get('/', loginRequired, communityController.getCommunityList);
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
