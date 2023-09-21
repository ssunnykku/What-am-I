import { communityService } from '../services/community.service.js';
import { deleteImg } from '../middlewares/uploadImageS3.js';

class communityController {
  // 1. 커뮤니티 만들기
  static async addCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { name, introduction } = req.body;
      const image = req.file;

      const communityImage =
        image == undefined ? null : decodeURI(image.location);
      const newCommunity = await communityService.createCommunity(
        name,
        introduction,
        userId,
        communityImage,
      );
      return res.status(201).send(newCommunity);
    } catch (error) {
      next(error);
    }
  }
  // 2. 커뮤니티 1개 가져오기
  static async getOne(req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.params.communityId;
      const findOne = await communityService.getOneCommunity({ id, userId });
      if (findOne.errorMessage) {
        throw new Error(findOne, errorMessage);
      }
      return res.status(200).json(findOne);
    } catch (error) {
      next(error);
    }
  }

  // 3. 전체 커뮤니티 리스트 10개씩
  static async getCommunityList(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { page } = req.query;
      const defaultPage = page || 1;
      const countCommunityPage = await communityService.countCommunity();
      const getCommunities = await communityService.getCommunities(
        defaultPage,
        userId,
      );
      if (!getCommunities) {
        throw new Error(getCommunities);
      }
      return res.status(200).json({ countCommunityPage, getCommunities });
    } catch (err) {
      next(err);
    }
  }

  // 4. 인기 커뮤니티 3개 가져오기
  static async getBestCommunities(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getLikedCommunities = await communityService.findBestCommunities({
        userId,
      });
      return res.status(200).json(getLikedCommunities);
    } catch (error) {
      next(error);
    }
  }
  // 5. 전체 커뮤니티와 커뮤니티 별 게시물들 보여주기
  static async getCommunitiesAndPosts(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getAll = await communityService.findAllCommunities();
      return res.status(200).json(getAll);
    } catch (error) {
      next(error);
    }
  }
  // 6. 커뮤니티 수정
  static async updateCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { name, introduction } = req.body;
      const communityId = req.params.communityId;
      const image = req.file;
      const updatedImage = image == undefined ? null : image.location;
      const updateCommunity = await communityService.updateCommunity({
        name,
        updatedImage,
        introduction,
        communityId,
        userId,
      });
      const lastImg = updateCommunity.findCommunity.dataValues.communityImage;
      // 새로 이미지 들어오면 기존 이미지는 삭제하기
      if (updatedImage) {
        deleteImg(lastImg);
      }
      if (updateCommunity.errorMessage) {
        throw new Error(updateCommunity, errorMessage);
      }

      const message = await communityService.findCommunity({
        communityId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
  // 7. 커뮤니티 삭제
  static async deleteCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.params.communityId;

      const deleteCommunity = await communityService.deleteCommunity({
        id,
        userId,
      });
      const img = deleteCommunity.dataValues.communityImage;
      // aws s3에서 삭제하기
      deleteImg(img);
      if (deleteCommunity.errorMessage) {
        throw new Error(deleteCommunity, errorMessage);
      }
      return res.status(200).json(deleteCommunity);
    } catch (error) {
      next(error);
    }
  }
  // 8. 커뮤니티 검색기능
  static async getFoundCommunities(req, res, next) {
    try {
      const userId = req.currentUserId;
      const search = req.query.data;
      const searchedData = await communityService.searchedCommunities({
        search,
      });
      if (searchedData.errorMessage) {
        throw new Error(searchedData, errorMessage);
      }
      return res.status(200).json(searchedData);
    } catch (error) {
      next(error);
    }
  }
}

export { communityController };
