import ReviewComment from '../models/ReviewComment.model';

class reviewCommentService {
  static async addReviewComment({ description, reviewId, userId }) {
    // db에 저장
    const createdNewComment = await ReviewComment.create({
      description,
      reviewId,
      userId,
    });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  static async showAllReviewComments({ _reviewId: reviewId }) {
    const _reviewId = await ReviewComment.findAll({
      where: { reviewId },
    });
    if (!_reviewId) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _reviewId;
    }
  }

  static async findMessage({ reviewCommentId, userId }) {
    const comment = await ReviewComment.findOne({
      where: { reviewCommentId: reviewCommentId, userId: userId },
    });
    if (!comment) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return comment;
    }
  }

  static async updateComment({ description, reviewCommentId, userId }) {
    //db검색

    const descriptionId = await ReviewComment.findOne({
      where: { reviewCommentId: reviewCommentId, userId: userId },
    });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!descriptionId) {
      const errorMessage = '등록한 댓글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }

    // db에 저장
    if (descriptionId) {
      const updateComment = await ReviewComment.update(
        { description: description },
        { where: { reviewCommentId: reviewCommentId, userId: userId } },
      );
      updateComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return descriptionId;
    }
  }

  static async deleteComment({ reviewCommentId, userId }) {
    const id = await ReviewComment.destroy({
      where: { reviewCommentId: reviewCommentId, userId: userId },
    });
    if (!id) {
      const errorMessage = '댓글이 없습니다';
      return errorMessage;
    } else {
      const message = '댓글이 삭제되었습니다.';
      return message;
    }
  }
}

export { reviewCommentService };
