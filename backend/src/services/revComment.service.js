import RevComment from '../models/RevComment.model';

class revCommentService {
  static async addRevComment({ description, reviewId }) {
    // db에 저장
    const createdNewComment = await RevComment.create({
      description,
      reviewId,
    });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  static async showAllRevComments({ _reviewId: reviewId }) {
    const _reviewId = await RevComment.findAll({
      where: { reviewId },
    });
    if (!_reviewId) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _reviewId;
    }
  }
}

export { revCommentService };
