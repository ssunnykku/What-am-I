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

// 3. 전체 커뮤니티 리스트 10개씩
communityRouter.get(
  '/communities',
  loginRequired,
  communityController.getCommunityList,
);

// 4. 인기 커뮤니티 3개
communityRouter.get(
  '/communities/best',
  loginRequired,
  communityController.getBestCommunities,
);

// 5. 전체 커뮤니티와 커뮤니티 별 게시물들(내림차순)
communityRouter.get(
  '/communities/posts',
  loginRequired,
  communityController.getCommunitiesAndPosts,
);

// 6. 커뮤니티 수정
communityRouter.put(
  '/communities/:communityId',
  loginRequired,
  upload.single('communityImage'),
  communityController.updateCommunity,
);

// 7. 커뮤니티 삭제
communityRouter.delete(
  '/communities/:communityId',
  loginRequired,
  communityController.deleteCommunity,
);

// 8. 검색기능
communityRouter.get(
  '/communities/search',
  loginRequired,
  communityController.getFoundCommunities,
);

export { communityRouter };
