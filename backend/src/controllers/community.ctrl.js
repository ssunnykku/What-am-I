import { Community } from '../models/Community.model';
import { communityService } from '../services/community.service';

class communityController {
  static async addCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { name, introduction } = req.body;
      const image = req.file;

      const communityImage = image == undefined ? null : image.location;
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

  //전체 커뮤니티 리스트 10개씩
  static async getCommunityList(req, res, next) {
    try {
      const { page } = req.query;
      const defaultPage = page || 1;
      const communityCount = await communityService.countCommunityPage();
      const selectedCommunities = await communityService.selectCommunities(
        defaultPage,
      );
      if (selectedCommunities.errorMessage) {
        throw new Error(selectedCommunities, errorMessage);
      }
      return res.status(200).json(selectedCommunities);
    } catch (err) {
      next(err);
    }
  }

  static async getBestCommunities(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getLikedCommunities = await communityService.findBestCommunities();
      res.status(200).json(getLikedCommunities);
    } catch (error) {
      next(error);
    }
  }
  // 이거야
  static async getCommunitiesAndPosts(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getAll = await communityService.findAllCommunities();
      res.status(200).json(getAll);
    } catch (error) {
      next(error);
    }
  }

  static async updateCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { name, introduction } = req.body;
      const communityId = req.params.communityId;
      const communityImage = req.file.location;
      const updateCommunity = await communityService.updateCommunity({
        name,
        communityImage,
        introduction,
        communityId,
        userId,
      });

      if (updateCommunity.errorMessage) {
        throw new Error(updateCommunity, errorMessage);
      }

      const message = await communityService.findCommunity({
        communityId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteCommunity(req, res, next) {
    try {
      const userId = req.currentUserId;
      // const userId = testId;
      const id = req.params.communityId;

      const deleteCommunity = await communityService.deleteCommunity({
        id,
        userId,
      });
      if (deleteCommunity.errorMessage) {
        throw new Error(deleteCommunity, errorMessage);
      }
      return res.status(200).json(deleteCommunity);
    } catch (error) {
      return next(error);
    }
  }

  static async getFoundCommunities(req, res, next) {
    try {
      const search = req.query.data;
      const searchedData = await communityService.searchedCommunities({
        search,
      });
      if (searchedData.errorMessage) {
        throw new Error(searchedData, errorMessage);
      }
      res.status(200).json(searchedData);
    } catch (error) {
      next(error);
    }
  }
}

export { communityController };
