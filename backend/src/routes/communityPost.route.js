import { Router } from 'express';
import { communityPostController } from '../controllers/communityPost.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityPostRouter = Router();
const upload = uploadImageS3();

communityPostRouter.post(
  '/communityPosts/:communityId',
  //   loginRequired,
  communityPostController.addPost,
);
// communityPostRouter.put(
//   '/image/:id',
//   loginRequired,
//   upload.single('communityImage'),
//   communityPostRouter.communityImage,
// );
// // communityRouter.get('/', loginRequired, communityPostController.getCommunityList);
// communityPostRouter.put(
//   '/:communityId',
//   loginRequired,
//   communityPostController.updateCommunity,
// );
// communityPostRouter.delete(
//   '/:communityId',
//   loginRequired,
//   communityPostController.deleteCommunity,
// );

export { communityPostRouter };
