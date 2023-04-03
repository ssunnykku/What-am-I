import { communityCommentService } from '../services/communityComment.service';

class communityCommentController {
  //1. 댓글쓰기
  static async newCommunityComments(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityPostId = req.params.communityPostId;
      const { description } = req.body;

      const communityComment =
        await communityCommentService.addCommunityComment({
          description,
          communityPostId,
          userId,
        });

      if (communityComment.errorMessage) {
        throw new Error(communityComment);
      }
      return res.status(201).json(communityComment);
    } catch (error) {
      next(error);
    }
  }
  //2. 게시물에 댓글 전부 다 보기
  static async showCommunityComments(req, res, next) {
    try {
      const _communityPostId = req.params.communityPostId;

      const communityComments =
        await communityCommentService.showAllCommunityComments({
          _communityPostId,
        });
      if (communityComments.errorMessage) {
        throw new Error(communityComments);
      }
      return res.status(200).json(communityComments);
    } catch (error) {
      next(error);
    }
  }
  //3. 게시물에 댓글 한개 보기
  static async showOneCommunityComments(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityPostId = req.params.communityPostId;

      const id = req.params.communityCommentId;

      const oneCommunityComment =
        await communityCommentService.showOneCommunityComments({
          id,
          communityPostId,
        });
      if (oneCommunityComment.errorMessage) {
        throw new Error(oneCommunityComment);
      }
      return res.status(200).json(oneCommunityComment);
    } catch (error) {
      next(error);
    }
  }
  //4. 내가 쓴 리뷰 수정
  static async updateComment(req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.params.communityCommentId;
      const { description } = req.body;

      const communityComment = await communityCommentService.updateComment({
        description,
        id,
        userId,
      });

      if (communityComment.errorMessage) {
        throw new Error(communityComment);
      }

      const message = await communityCommentService.findMessage({
        id,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
  //5. 내가쓴 댓글 삭제
  static async deleteComment(req, res, next) {
    try {
      const userId = req.currentUserId;

      const id = req.params.communityCommentId;

      const deleteComment = await communityCommentService.deleteComment({
        id,
        userId,
      });
      if (deleteComment.errorMessage) {
        throw new Error(deleteComment);
      }
      return res.status(200).json(deleteComment);
    } catch (error) {
      next(error);
    }
  }
}

export { communityCommentController };
