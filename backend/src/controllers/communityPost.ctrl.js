import { communityPostService } from '../services/communityPost.service';
import { Sequelize } from 'sequelize';

const Op = Sequelize.Op;

class communityPostController {
  static async addPost(req, res, next) {
    try {
      const userId = req.currentUserId;
      // const userId = req.currentUserId;
      const communityId = req.params.communityId;

      const { images, description } = req.body;
      const newPost = await communityPostService.createPost({
        images,
        description,
        userId,
        communityId,
      });
      if (newPost.errorMessage) {
        throw new Error(newPost, errorMessage);
      }
      return res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  //   static async communityImage(req, res, next) {
  //     try {
  //       const userId = req.currentUserId;
  //       const id = req.params.id;
  //       const communityImage = req.file.location;
  //       const image = await communityPostService.addCommunityImage({
  //         id,
  //         userId,
  //         communityImage,
  //       });
  //       return res.status(200).json({
  //         id,
  //         userId,
  //         communityImage,
  //         success: true,
  //         message: '이미지가 저장되었습니다.',
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //전체 커뮤니티글 리스트 10개씩
  static async getCommunityPostList(req, res, next) {
    try {
      const { page } = req.query;
      const defaultPage = page || 1;
      const communityId = req.params.communityId;
      console.log('test', communityId);

      const communityPostCount = await communityPostService.communityPostCount(
        communityId,
      );
      const selectedCommunityPost =
        await communityPostService.selectCommunityPost(
          defaultPage,
          communityId,
        );
      if (selectedCommunityPost.errorMessage) {
        throw new Error(selectedCommunityPost, errorMessage);
      }
      return res
        .status(200)
        .json({ result: { communityPostCount, selectedCommunityPost } });
    } catch (err) {
      next(err);
    }
  }

  //내가쓴 포스팅(글) 수정
  static async updateCommunityPost(req, res) {
    try {
      const userId = testId;
      // const userId = req.currentUserId;

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
        throw new Error(updateCommunityPost, errorMessage);
      }

      const message = await communityPostService.findCommunityPost({
        id,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  }

  //내가쓴 포스팅(글) 삭제하기
  static async deleteCommunityPost(req, res) {
    try {
      const userId = testId;
      // const userId = req.currentUserId;
      const id = req.params.id;

      const deleteCommunityPost =
        await communityPostService.deleteCommunityPost({
          id,
          userId,
        });
      if (deleteCommunityPost.errorMessage) {
        throw new Error(deleteCommunityPost, errorMessage);
      }
      return res.status(200).json(deleteCommunityPost);
    } catch (error) {
      return next(error);
    }
  }
}

export { communityPostController };
