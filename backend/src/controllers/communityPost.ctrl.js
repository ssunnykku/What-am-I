import { communityPostService } from '../services/communityPost.service';
import { communityService } from '../services/community.service';

import { Sequelize } from 'sequelize';
import Joi from 'joi';

const Op = Sequelize.Op;

class communityPostController {
  static async addPost(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;

      const getImages = req.files;

      let postedImages = '';

      for (const image of getImages) {
        postedImages += `${image.location.toString()}최고`;
      }
      const images = postedImages.slice(0, -2);

      const { description } = req.body;
      const newPost = await communityPostService.createPost({
        images,
        description,
        userId,
        communityId,
      });
      return res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  //전체 커뮤니티글 리스트 10개씩
  static async getCommunityPostList(req, res, next) {
    try {
      const userId = req.currentUserId;

      const { page } = req.query;
      const defaultPage = page || 1;
      const communityId = req.params.communityId;

      const countCommunityLike = await communityService.getCommunityLike({
        communityId,
        userId,
      });
      const myCommunityLikeStatus = await communityService.getCommunityStatus({
        communityId,
        userId,
      });

      const countAllPosts = await communityPostService.countAllPosts(
        communityId,
      );

      const communityPostCount = await communityPostService.communityPostCount(
        communityId,
      );

      const selectedCommunityPost =
        await communityPostService.selectCommunityPost(
          defaultPage,
          communityId,
          userId,
        );
      if (selectedCommunityPost.errorMessage) {
        throw new Error(selectedCommunityPost);
      }
      return res.status(200).json({
        countCommunityLike,
        myCommunityLikeStatus,

        countAllPosts,
        communityPostCount,
        selectedCommunityPost,
      });
    } catch (err) {
      next(err);
    }
  }

  // 커뮤니티글 한개씩
  static async getOneCommunityPost(req, res, next) {
    try {
      const id = req.params.communityPostId;
      const oneCommunityPost =
        await communityPostService.selectOneCommunityPost(id);
      if (oneCommunityPost.errorMessage) {
        throw new Error(oneCommunityPost);
      }
      return res.status(200).json(oneCommunityPost);
    } catch (err) {
      next(err);
    }
  }

  //내가쓴 포스팅(글) 수정
  static async updateCommunityPost(req, res, next) {
    try {
      // const userId = testId;
      const userId = req.currentUserId;
      const id = req.params.id;
      const { images, description } = req.body;

      const updateCommunityPost =
        await communityPostService.updateCommunityPost({
          images,
          description,
          id,
          userId,
        });

      if (updateCommunityPost.errorMessage) {
        throw new Error(updateCommunityPost);
      }

      const message = await communityPostService.findCommunityPost({
        id,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  //내가쓴 포스팅(글) 삭제하기
  static async deleteCommunityPost(req, res, next) {
    try {
      // const userId = testId;
      const userId = req.currentUserId;
      const id = req.params.id;

      const deleteCommunityPost =
        await communityPostService.deleteCommunityPost({
          id,
          userId,
        });
      if (deleteCommunityPost.errorMessage) {
        throw new Error(deleteCommunityPost);
      }
      return res.status(200).json(deleteCommunityPost);
    } catch (error) {
      next(error);
    }
  }
}

export { communityPostController };
