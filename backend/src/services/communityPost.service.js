import { CommunityPost } from '../models/CommunityPost.model';
import ApiError from '../utils/ApiError';
import { COMMUNITYPOST_PER_PAGE } from '../utils/Constant';

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

  static async communityPostCount(communityId) {
    const { count, rows } = await CommunityPost.findAndCountAll({
      where: {
        communityId: { communityId },
      },
      // offset: 10,
      // limit: 2
    });

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

  static async selectCommunityPost(defaultPage, communityId) {
    const selectedCommunityPost = await CommunityPost.findAll({
      where: { communityId: communityId },
      order: [['id', 'DESC']],

      offset: (defaultPage - 1) * COMMUNITYPOST_PER_PAGE,
      limit: COMMUNITYPOST_PER_PAGE,
    });
    if (!selectedCommunityPost) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunityPost;
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
