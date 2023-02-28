import { Router } from 'express';
import { communityCommentController } from '../controllers/communityComment.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityCommentRouter = Router();

//1. 댓글쓰기
communityCommentRouter.post(
  '/communityComment/:communityPostId',
  loginRequired,
  communityCommentController.newCommunityComments,
);
//2. 게시물에 댓글 전부 다 보기
communityCommentRouter.get(
  '/communityComment/:communityPostId',
  loginRequired,
  communityCommentController.showCommunityComments,
);

//3. 게시물에 댓글 한개 보기
communityCommentRouter.get(
  '/communityComment/:communityPostId/:communityCommentId',
  loginRequired,
  communityCommentController.showOneCommunityComments,
);

//4. 내가 쓴 리뷰 수정
communityCommentRouter.put(
  '/communityComment/:communityCommentId',
  loginRequired,
  communityCommentController.updateComment,
);

//5. 내가쓴 댓글 삭제
communityCommentRouter.delete(
  '/communityComment/:communityCommentId',
  loginRequired,
  communityCommentController.deleteComment,
);

//6.게시물 댓글 작성자 프로필 보기 (해당 Id 한개씩)
communityCommentRouter.get(
  '/communityComment/:communityCommentId',
  loginRequired,
  communityCommentController.CommunityCommenterInfo,
);

export { communityCommentRouter };
