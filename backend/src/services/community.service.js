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

  static async getCommunityLike({ communityId: id, userId }) {
    const getCommunity = await Community.findOne({ where: { id } });
    if (!getCommunity) {
      const errorMessage = `Cannot find id = ${id} community`;
      return errorMessage;
    }
    getCommunity.dataValues.likeCount = await CommunityLike.count({
      where: { communityId: id },
    });

    const likeCount = getCommunity.dataValues.likeCount;

    return likeCount;
  }

  static async getCommunityStatus({ communityId: id, userId }) {
    const getCommunity = await Community.findOne({ where: { id } });
    if (!getCommunity) {
      const errorMessage = `Cannot find id = ${id} community`;
      return errorMessage;
    }
    getCommunity.dataValues.likeStatus = await CommunityLike.count({
      where: {
        userId: userId,
        communityId: id,
      },
    });

    const likeStatus = getCommunity.dataValues.likeStatus;

    return likeStatus;
  }

  static async getOneCommunity({ id, userId }) {
    const getCommunity = await Community.findOne({ where: { id } });
    if (!getCommunity) {
      const errorMessage = `Cannot find id = ${id} community`;
      return errorMessage;
    }
    getCommunity.dataValues.likeCount = await CommunityLike.count({
      where: { communityId: id },
    });
    getCommunity.dataValues.likeStatus = await CommunityLike.count({
      where: {
        userId: userId,
        communityId: id,
      },
    });
    return getCommunity;
  }

  static async countCommunity() {
    const showCommunityCount = await Community.count({
      where: { id: { [Op.gt]: 0 } },
      order: [['id', 'DESC']],
    });

    if (showCommunityCount % COMMUNITY_PER_PAGE === 0) {
      return showCommunityCount / COMMUNITY_PER_PAGE;
    } else {
      return Math.floor(showCommunityCount / COMMUNITY_PER_PAGE) + 1;
    }
  }

  static async selectCommunity(defaultPage, userId) {
    const selectedCommunity = await Community.findAll({
      where: { id: { [Op.gt]: 0 } },
      order: [['id', 'DESC']],
      offset: (defaultPage - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
    });

    for (const community of selectedCommunity) {
      community.dataValues.likeCount = await CommunityLike.count({
        where: { communityId: community.id },
      });

      community.dataValues.likeStatus = await CommunityLike.count({
        where: { userId: userId, communityId: community.id },
      });
    }

    return selectedCommunity;
  }

  static async showAllCommunities(defaultPage) {
    const selectedCommunities = await Community.findAll({
      offset: (defaultPage - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
      order: [['id', 'DESC']],
    });

    if (!selectedCommunities) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunities;
  }

  static async findBestCommunities({ userId }) {
    const bestThree = await CommunityLike.findAll({
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
    for (const community of bestThree) {
      community.dataValues.Community.dataValues.likeStatus =
        await CommunityLike.count({
          where: { userId: userId, communityId: community.communityId },
        });
      for (const community of bestThree) {
        community.dataValues.Community.dataValues.countLike =
          await CommunityLike.count({
            where: { communityId: community.communityId },
          });
      }
    }

    return bestThree;
  }

  static async findAllCommunities() {
    const findAll = await Community.findAndCountAll({
      include: { model: CommunityPost },
      order: [['id', 'DESC']],
    });
    return findAll;
  }

  static async updateCommunity({
    name,
    updatedImage,
    introduction,
    communityId,
    userId,
  }) {
    //db검색
    const findCommunity = await Community.findOne({
      where: { id: communityId, userId: userId },
    });

    if (!findCommunity) {
      const errorMessage = '등록한 글이 없습니다. 다시 한 번 확인해 주세요.';
      return errorMessage;
    }

    const communityImage =
      updatedImage == null ? findCommunity.communityImage : updatedImage;

    const updatedName = undefined ? findCommunity.name : name;
    const updatedIntroduction = undefined
      ? findCommunity.introduction
      : introduction;

    const updateCommunity = await Community.update(
      {
        name: updatedName,
        communityImage,
        introduction: updatedIntroduction,
      },
      { where: { id: communityId, userId } },
    );
    updateCommunity.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return updateCommunity;
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

  static async searchedCommunities({ search }) {
    const searchResult = await Community.findAndCountAll({
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
