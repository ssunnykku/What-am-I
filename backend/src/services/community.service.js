import { Community } from '../models/Community.model';
import { CommunityPost } from '../models/CommunityPost.model';
import { CommunityLike } from '../models/CommunityLike.model';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/Constant';
import { Op } from 'sequelize';

class communityService {
  static async createCommunity(name, introduction, userId, communityImage) {
    const createCommunity = await Community.create({
      name: name,
      introduction: introduction,
      userId: userId,
      communityImage: communityImage,
    });

    return createCommunity;
  }

  static async countCommunityPage() {
    const communityCount = await Community.count();
    if (communityCount % COMMUNITY_PER_PAGE === 0) {
      return communityCount / COMMUNITY_PER_PAGE;
    } else {
      return Math.floor(communityCount / COMMUNITY_PER_PAGE) + 1;
    }
  }

  static async selectCommunities(defaultPage) {
    const selectedCommunities = await Community.findAll({
      offset: (Number(defaultPage) - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
      order: [['id', 'DESC']],
    });

    if (!selectedCommunities) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunities;
  }

  static async findBestCommunities() {
    const result = await CommunityLike.findAll({
      attributes: [
        'communityId',
        [CommunityLike.sequelize.fn('count', '*'), 'countLike'],
      ],
      group: 'communityId',
      order: [['countLike', 'DESC']],
      limit: 3,
      include: [
        {
          model: Community,
        },
      ],
    });
    return result;
  }

  // 이거?
  static async findAllCommunities() {
    const findAll = await Community.findAndCountAll({
      include: { model: CommunityPost },
      order: [['id', 'DESC']],
    });
    return findAll;
  }

  static async updateCommunity({
    name,
    communityImage,
    introduction,
    communityId,
    userId,
  }) {
    //db검색
    const updatedResult = await Community.findOne({
      where: { id: communityId, userId: userId },
    });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!updatedResult) {
      const errorMessage = '등록한 글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }
    // db에 저장
    if (updatedResult) {
      const updateCommunity = await Community.update(
        {
          name,
          communityImage,
          introduction,
        },
        { where: { id: communityId, userId } },
      );
      updateCommunity.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

      return updateCommunity;
    }
  }

  static async findCommunity({ communityId, userId }) {
    const comment = await Community.findOne({
      where: { id: communityId, userId: userId },
    });
    if (!comment) {
      const errorMessage = '작성한 글이 없습니다';
      return { errorMessage };
    } else {
      return comment;
    }
  }

  static async deleteCommunity({ id, userId }) {
    const id_ = await Community.destroy({
      where: { id: id, userId: userId },
    });
    if (!id_) {
      const errorMessage = '생성한 커뮤니티가 없습니다';
      return errorMessage;
    } else {
      const message = '커뮤니티가 삭제되었습니다.';
      return message;
    }
  }
  // [Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
  // [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
  static async searchedCommunities({ search }) {
    const searchResult = await Community.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            introduction: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      order: [['id', 'DESC']],
    });
    if (searchResult.length === 0) {
      const errorMessage = `Cannot find information about '${search}' `;
      return errorMessage;
    }
    return searchResult;
  }
}

export { communityService };
