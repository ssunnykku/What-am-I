import { communityPostService } from '../services/communityPost.service';
import { Sequelize } from 'sequelize';
import Joi from 'joi';

const Op = Sequelize.Op;

class communityPostController {
  static async addPost(req, res, next) {
    try {
      const userId = req.currentUserId;

      const communityId = req.params.communityId;

      const imgs = JSON.stringify(req.files);
      const images =
        imgs == '{}'
          ? null
          : JSON.parse(imgs)
              .images.map((x, i) => JSON.parse(imgs).images[i].location)
              .toString();

      // const { description } = req.body;
      const schema = Joi.object().keys({
        description: Joi.string().min(1).max(200),
      });
      const { description } = await schema.validateAsync(req.body);

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
      const { page } = req.query;
      const defaultPage = page || 1;
      const communityId = req.params.communityId;

      const communityPostCount = await communityPostService.communityPostCount(
        communityId,
      );

      const selectedCommunityPost =
        await communityPostService.selectCommunityPost(
          defaultPage,
          communityId,
        );
      if (selectedCommunityPost.errorMessage) {
        throw new Error(selectedCommunityPost);
      }
      return res
        .status(200)
        .json({ result: { communityPostCount, selectedCommunityPost } });
    } catch (err) {
      next(err);
    }
  }

  //내가쓴 포스팅(글) 수정
  static async updateCommunityPost(req, res, next) {
    try {
      // const userId = testId;
      const userId = req.currentUserId;
      console.log(userId);
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
