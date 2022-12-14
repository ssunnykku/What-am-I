import { CommunityComment } from '../models/CommunityComment.model';
import sequelize from '../config/sequelize';

class communityCommentService {
  static async addCommunityComment({ description, communityPostId, userId }) {
    // db에 저장
    const createdNewComment = await CommunityComment.create({
      description,
      communityPostId,
      userId,
    });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewComment;
  }

  static async showAllCommunityComments({ _communityPostId: communityPostId }) {
    const [_communityPostId, metadata] = await sequelize.query(
      `select CC.id,CC.description,CC.userId,CC.communityPostId,U.userId,U.nickname,U.profileImg from communityComments as CC  inner join users as U on CC.userId = U.userId where communityPostId=${communityPostId}`,
    );

    // const _communityPostId = await CommunityComment.findAll({
    //   where: { communityPostId },
    // });
    if (!_communityPostId) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _communityPostId;
    }
  }

  static async showOneCommunityComments({
    id: id,
    communityPostId: communityPostId,
  }) {
    const [_id, metadata] = await sequelize.query(
      `select CC.id, CC.description, CC.userId, CC.communityPostId ,U.userId, U.nickname, U.profileImg from communityComments as CC  inner join users as U on CC.userId = U.userId where CC.id=${id} and communityPostId=${communityPostId};`,
    );

    // const _id = await CommunityComment.findOne({
    //   where: { id: id, communityPostId: communityPostId },
    // });
    if (!_id) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _id;
    }
  }

  static async findMessage({ id, userId }) {
    const comment = await CommunityComment.findOne({
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

    const descriptionId = await CommunityComment.findOne({
      where: { id: id, userId: userId },
    });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!descriptionId) {
      const errorMessage = '등록한 댓글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }

    // db에 저장
    if (descriptionId) {
      const updateComment = await CommunityComment.update(
        { description: description },
        { where: { id: id, userId: userId } },
      );
      updateComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return descriptionId;
    }
  }

  static async deleteComment({ id, userId }) {
    const id_ = await CommunityComment.destroy({
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

export { communityCommentService };
