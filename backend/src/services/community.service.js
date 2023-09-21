import { Community } from '../models/Community.model.js';
import { CommunityPost } from '../models/CommunityPost.model.js';
import { CommunityLike } from '../models/CommunityLike.model.js';
import ApiError from '../utils/ApiError.js';
import dotenv from 'dotenv';
import { PinnedCommunity } from '../models/PinnedCommunity.model.js';
import { Op } from 'sequelize';

dotenv.config();
class communityService {
  // 1. 커뮤니티 만들기
  static async createCommunity(name, introduction, userId, communityImage) {
    const createCommunity = await Community.create({
      name: name,
      introduction: introduction,
      userId: userId,
      communityImage: communityImage,
    });

    return createCommunity;
  }
  // like 갯수 몇개인지 보내주기
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
  // 좋아요 한 게시물인지 확인해서 res값에 포함(상태)
  static async getCommunityStatus({ communityId: id, userId }) {
    const getCommunity = await Community.findOne({ where: { id } });
    if (!getCommunity) {
      const errorMessage = `Cannot find "id = ${id}" community`;
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
  // 2. 커뮤니티 1개 가져오기
  static async getOneCommunity({ id, userId }) {
    const getCommunity = await Community.findOne({ where: { id } });
    if (!getCommunity) {
      const errorMessage = `Cannot find id = ${id} community`;
      return errorMessage;
    }
    // 해당 게시물 좋아요 개수
    getCommunity.dataValues.likeCount = await CommunityLike.count({
      where: { communityId: id },
    });
    // 유저의 좋아요 상태
    getCommunity.dataValues.likeStatus = await CommunityLike.count({
      where: {
        userId: userId,
        communityId: id,
      },
    });
    // 유저의 pin 설정 여부
    getCommunity.dataValues.pinStatus = await PinnedCommunity.count({
      where: {
        userId,
        communityId: id,
      },
    });

    return getCommunity;
  }
  // 3. 전체 커뮤니티 리스트 10개씩
  static async countCommunity() {
    const showCommunityCount = await Community.count({
      where: { id: { [Op.gt]: 0 } },
      order: [['id', 'DESC']],
    });

    if (showCommunityCount % +process.env.COMMUNITY_PER_PAGE === 0) {
      return showCommunityCount / +process.env.COMMUNITY_PER_PAGE;
    } else {
      return Math.ceil(showCommunityCount / +process.env.COMMUNITY_PER_PAGE);
    }
  }

  // 커뮤니티 전체 가져오기
  static async getCommunities(defaultPage, userId) {
    const Communities = await Community.findAll({
      where: { id: { [Op.gt]: 0 } },
      order: [['id', 'DESC']],
      offset: (defaultPage - 1) * +process.env.COMMUNITY_PER_PAGE,
      limit: +process.env.COMMUNITY_PER_PAGE,
    });

    for (const community of Communities) {
      // 좋아요 갯수
      community.dataValues.likeCount = await CommunityLike.count({
        where: { communityId: community.id },
      });
      // 좋아요 상태
      community.dataValues.likeStatus = await CommunityLike.count({
        where: { userId: userId, communityId: community.id },
      });
      // pin 상태
      community.dataValues.pinStatus = await PinnedCommunity.count({
        where: { userId, communityId: community.id },
      });
    }

    return Communities;
  }

  static async showAllCommunities(defaultPage) {
    const selectedCommunities = await Community.findAll({
      offset: (defaultPage - 1) * +process.env.COMMUNITY_PER_PAGE,
      limit: +process.env.COMMUNITY_PER_PAGE,
      order: [['id', 'DESC']],
    });

    if (!selectedCommunities) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunities;
  }
  // 4. 인기 커뮤니티 3개 가져오기
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

      community.dataValues.Community.dataValues.countLike =
        await CommunityLike.count({
          where: { communityId: community.communityId },
        });

      community.Community.dataValues.pinStatus = await PinnedCommunity.count({
        where: { userId, communityId: community.communityId },
      });
    }

    return bestThree;
  }
  // 5. 전체 커뮤니티와 커뮤니티 별 게시물들 보여주기
  static async findAllCommunities() {
    const findAll = await Community.findAndCountAll({
      include: { model: CommunityPost },
      order: [['id', 'DESC']],
    });
    return findAll;
  }
  // 6. 커뮤니티 수정
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

    return { findCommunity, updateCommunity };
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
  // 7. 커뮤니티 삭제
  static async deleteCommunity({ id, userId }) {
    const findData = await Community.findOne({ where: { id } });
    const id_ = await Community.destroy({
      where: { id: id, userId: userId },
    });
    if (!id_) {
      const errorMessage = '생성한 커뮤니티가 없습니다';
      return errorMessage;
    }
    // const message = '커뮤니티가 삭제되었습니다.';
    return findData;
  }
  // 8. 커뮤니티 검색기능
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
