import { Sequelize } from 'sequelize';
import sequelize from '../config/sequelize';
import { ReviewComment } from '../models/ReviewComment.model';
import { User } from '../models/User.model';

class reviewCommentService {
  static async addReviewComment({ description, reviewId, userId }) {
    // db에 저장
    // const _createdNewComment =
    await ReviewComment.create({
      description,
      reviewId,
      userId,
    });

    const createdNewComment = await ReviewComment.findOne({
      where: { description: description, userId: userId, reviewId: reviewId },
    });

    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  static async showAllReviewComments({ _reviewId: reviewId }) {
    const [_reviewId, metadata] = await sequelize.query(
      `select RC.id,RC.description,RC.userId,RC.reviewId,U.userId,U.nickname,U.profileImg from reviewComments as RC  inner join users as U on RC.userId = U.userId where reviewId=${reviewId}`,
    );
    // 아래는 왜 안될까? userId가 안가져와짐.
    // const _reviewId = await ReviewComment.findAll({
    //   where: { reviewId },
    //   include: [
    //     {
    //       model: User,
    //       // attributes: ['nickname', 'profileImg'],
    //     },
    //   ],
    // });

    if (!_reviewId) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _reviewId;
    }
  }

  static async showOneReviewComments({ id: id, reviewId: reviewId }) {
    // const _id = await ReviewComment.findOne({
    //   where: { id: id, reviewId: reviewId },
    // });

    const [_id, metadata] = await sequelize.query(
      `select RC.id, RC.description, RC.userId, RC.reviewId ,U.userId, U.nickname, U.profileImg from reviewComments as RC  inner join users as U on RC.userId = U.userId where RC.id=${id} and reviewId=${reviewId};`,
    );

    if (!_id) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _id;
    }
  }

  static async findMessage({ id, userId }) {
    const comment = await ReviewComment.findOne({
      where: { id: id, userId: userId },
    });
    if (!comment) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return comment;
    }
  }

  static async updateComment({ description, id, userId }) {
    //db검색

    const descriptionId = await ReviewComment.findOne({
      where: { id: id, userId: userId },
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
        { where: { id: id, userId: userId } },
      );
      updateComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return descriptionId;
    }
  }

  static async deleteComment({ id, userId }) {
    const id_ = await ReviewComment.destroy({
      where: { id: id, userId: userId },
    });
    if (!id_) {
      const errorMessage = '댓글이 없습니다';
      return errorMessage;
    } else {
      const message = '댓글이 삭제되었습니다.';
      return message;
    }
  }
}

export { reviewCommentService };
