import { CommunityComment } from '../models/CommunityComment.model';
import { User } from '../models/User.model';
import { Friend } from '../models/Friend.model';
import sequelize from '../config/sequelize';

class communityCommentService {
  //1. 댓글쓰기
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

  //2. 게시물에 댓글 전부 다 보기
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
  //3. 게시물에 댓글 한개 보기
  static async showOneCommunityComments({
    id: id,
    communityPostId: communityPostId,
  }) {
    const [_id, metadata] = await sequelize.query(
      `select CC.id, CC.description, CC.userId, CC.communityPostId ,U.userId, U.nickname, U.profileImg from communityComments as CC  inner join users as U on CC.userId = U.userId where CC.id=${id} and communityPostId=${communityPostId};`,
    );

    if (!_id) {
      const errorMessage = '댓글이 없습니다';
      return { errorMessage };
    } else {
      return _id;
    }
  }
  //4. 내가 쓴 리뷰 수정
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
  //5. 내가쓴 댓글 삭제
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
  //6. 게시물 댓글 작성자 프로필 보기 (해당 Id 한개씩)
  static async getCommenterProfile({ id, userId }) {
    const getProfile = await CommunityComment.findOne({
      where: { id: id },
      attributes: ['id', 'userId', 'profileImg'],
    });
    // const friend = await Friend.findAll();
    // console.log(friend);
    return;
  }
}

export { communityCommentService };
