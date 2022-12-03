import { CommunityPost } from '../models/CommunityPost.model';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/Constant';

class communityPostService {
  static async createPost({ communityId, images, description }) {
    const createPost = await CommunityPost.create({
      communityId,
      images,
      description,
    });

    return createPost;
  }

  //   static async addCommunityImage({ communityImage, userId, id }) {
  //     const updateImage = await CommunityPost.update(
  //       { communityImage: communityImage },
  //       {
  //         where: { userId, id },
  //       },
  //     );
  //     return updateImage;
  //   }

  //   static async countCommunityPage() {
  //     const communityCount = await CommunityPost.count();
  //     if (communityCount % COMMUNITY_PER_PAGE === 0) {
  //       return communityCount / COMMUNITY_PER_PAGE;
  //     } else {
  //       return Math.floor(communityCount / COMMUNITY_PER_PAGE) + 1;
  //     }
  //   }

  //   static async selectCommunities(defaultPage) {
  //     const selectedCommunities = await CommunityPost.findAll({
  //       offset: (defaultPage - 1) * COMMUNITY_PER_PAGE,
  //       limit: COMMUNITY_PER_PAGE,
  //     });

  //     if (!selectedCommunities) {
  //       throw ApiError.setBadRequest('No community available');
  //     }

  //     return selectedCommunities;
  //   }

  //   static async updateCommunity({
  //     name,
  //     communtyImage,
  //     introduction,
  //     communityId,
  //     userId,
  //   }) {
  //     //db검색
  //     const updateCommunity = await CommunityPost.findOne({
  //       where: { communityId: communityId, userId: userId },
  //     });
  //     // db에서 찾지 못한 경우, 에러 메시지 반환
  //     if (!updateCommunity) {
  //       const errorMessage = '등록한 글이 없습니다. 다시 한 번 확인해 주세요.';
  //       return errorMessage;
  //     }
  //     // db에 저장
  //     if (updateCommunity) {
  //       const updateCommunity = await CommunityPost.update(
  //         {
  //           name: name,
  //           communtyImage: communtyImage,
  //           introduction: introduction,
  //         },
  //         { where: { communityId: communityId, userId: userId } },
  //       );
  //       updateCommunity.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

  //       return updateCommunity;
  //     }
  //   }

  //   static async findCommunity({ communityId, userId }) {
  //     const comment = await CommunityPost.findOne({
  //       where: { communityId: communityId, userId: userId },
  //     });
  //     if (!comment) {
  //       const errorMessage = '작성한 글이 없습니다';
  //       return { errorMessage };
  //     } else {
  //       return comment;
  //     }
  //   }

  //   static async deleteCommunity({ communityId, userId }) {
  //     const id = await CommunityPost.destroy({
  //       where: { communityId: communityId, userId: userId },
  //     });
  //     if (!id) {
  //       const errorMessage = '생성한 커뮤니티가 없습니다';
  //       return errorMessage;
  //     } else {
  //       const message = '커뮤니티가 삭제되었습니다.';
  //       return message;
  //     }
  //   }
}

export { communityPostService };
