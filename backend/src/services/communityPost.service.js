import { CommunityPost } from '../models/CommunityPost.model';
import ApiError from '../utils/ApiError';
import { COMMUNITYPOST_PER_PAGE } from '../utils/Constant';
import sequelize from '../config/sequelize';
import { CommunityPostLike } from '../models/CommunityPostLike.model';

class communityPostService {
  static async createPost({ userId, communityId, images, description }) {
    const createPost = await CommunityPost.create({
      images,
      description,
      userId,
      communityId,
    });

    return createPost;
  }

  static async countAllPosts(communityId) {
    const communityPostCount = await CommunityPost.count({
      where: {
        communityId: communityId,
      },
    });

    if (!communityPostCount) {
      return 0;
    } else {
      return communityPostCount;
    }
  }

  static async communityPostCount(communityId) {
    const communityPostCount = await CommunityPost.count({
      where: {
        communityId: communityId,
      },
    });

    if (communityPostCount % COMMUNITYPOST_PER_PAGE === 0) {
      return communityPostCount / COMMUNITYPOST_PER_PAGE;
    } else {
      return Math.floor(communityPostCount / COMMUNITYPOST_PER_PAGE) + 1;
    }
  }

  static async selectCommunityPost(defaultPage, communityId, userId) {
    const selectedCommunityPost = await CommunityPost.findAll({
      where: { communityId: communityId },
      order: [['id', 'DESC']],

      offset: (defaultPage - 1) * COMMUNITYPOST_PER_PAGE,
      limit: COMMUNITYPOST_PER_PAGE,
    });
    if (!selectedCommunityPost) {
      throw ApiError.setBadRequest('No community available');
    }
    for (const communityPost of selectedCommunityPost) {
      communityPost.dataValues.likeCount = await CommunityPostLike.count({
        where: { communityPostId: communityPost.id },
      });
      communityPost.dataValues.likeStatus = await CommunityPostLike.count({
        where: {
          userId: userId,
          communityPostId: communityPost.id,
        },
      });
    }

    return selectedCommunityPost;
  }

  //커뮤니티 안에있는 한개의 글 가지고 오기

  static async selectOneCommunityPost(id) {
    const [selectedCommunityPost, metadata] = await sequelize.query(
      `select CP.id, CP.images, CP.description, CP.communityId ,U.userId, U.nickname, U.profileImg from communityPosts as CP  inner join users as U on CP.userId = U.userId where CP.id=${id}`,
    );
    if (!selectedCommunityPost) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunityPost[0];
  }

  static async updateCommunityPost({ images, description, id, userId }) {
    //db검색

    const updateCommunityPost = await CommunityPost.findOne({
      where: { id: id, userId: userId },
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!updateCommunityPost) {
      const errorMessage = '등록한 글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }
    // db에 저장
    if (updateCommunityPost) {
      const updateCommunityPost = await CommunityPost.update(
        {
          images: images,
          description: description,
        },
        { where: { id: id, userId: userId } },
      );
      updateCommunityPost.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return updateCommunityPost;
    }
  }

  static async findCommunityPost({ id, userId }) {
    const post = await CommunityPost.findOne({
      where: { id: id, userId: userId },
    });
    if (!post) {
      const errorMessage = '작성한 글이 없습니다';
      return { errorMessage };
    } else {
      return post;
    }
  }

  static async deleteCommunityPost({ id, userId }) {
    const _id = await CommunityPost.destroy({
      where: { id: id, userId: userId },
    });
    if (!_id) {
      const errorMessage = '생성한 글이 없습니다';
      return errorMessage;
    } else {
      const message = '글이 삭제되었습니다.';
      return message;
    }
  }
}

export { communityPostService };
