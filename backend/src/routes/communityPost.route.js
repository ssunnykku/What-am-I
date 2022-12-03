import { Router } from 'express';
import { communityPostController } from '../controllers/communityPost.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const communityPostRouter = Router();
const upload = uploadImageS3();

//해당커뮤니티에 나의 게시글 남기기
communityPostRouter.post(
  '/communityPost/:communityId',
  // loginRequired,
  communityPostController.addPost,
);

// communityPostRouter.put(
//   '/image/:id',
//   loginRequired,
//   upload.single('communityImage'),
//   communityPostRouter.communityImage,
// );

//해당 커뮤니티의 게시글 전부 다 가지고 오기
communityPostRouter.get(
  '/communityPost/:communityId',
  // loginRequired,
  communityPostController.getCommunityPostList,
);

//내가 쓴 포스팅(글) 수정하기
communityPostRouter.put(
  '/communityPost/:id',
  // loginRequired,
  communityPostController.updateCommunityPost,
);

//내가 쓴 포스팅(글) 삭제하기
communityPostRouter.delete(
  '/communityPost/:id',
  // loginRequired,
  communityPostController.deleteCommunityPost,
);

export { communityPostRouter };
