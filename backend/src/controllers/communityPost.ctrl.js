import { communityPostService } from '../services/communityPost.service';

class communityPostController {
  static async addPost(req, res, next) {
    try {
      const userId = req.currentUserId;
      const communityId = req.params.communityId;

      const { images, description } = req.body;
      const newPost = await communityPostService.createPost({
        communityId,
        images,
        description,
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
  //   //전체 커뮤니티 리스트 10개씩
  //   static async getCommunityList(req, res, next) {
  //     try {
  //       const { page } = req.query;
  //       const defaultPage = page || 1;
  //       const communityCount = await communityPostService.countCommunityPage();
  //       const selectedCommunities = await communityPostService.selectCommunities(
  //         defaultPage,
  //       );
  //       if (selectedCommunities.errorMessage) {
  //         throw new Error(selectedCommunities, errorMessage);
  //       }
  //       return res.status(200).json(communityCount, selectedCommunities);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  //   static async updateCommunity(req, res) {
  //     try {
  //       const userId = req.currentUserId;

  //       const communityId = req.params.communityId;
  //       const { name, communtyImage, introduction } = req.body;

  //       const updateCommunity = await communityPostService.updateCommunity({
  //         name,
  //         communtyImage,
  //         introduction,
  //         communityId,
  //         userId,
  //       });

  //       if (updateCommunity.errorMessage) {
  //         throw new Error(updateCommunity, errorMessage);
  //       }

  //       const message = await communityPostService.findCommunity({
  //         communityId,
  //         userId,
  //       });
  //       return res.status(200).json(message);
  //     } catch (error) {
  //       return res.status(400).json({ code: 400, message: error.message });
  //     }
  //   }

  //   static async deleteCommunity(req, res) {
  //     try {
  //       const userId = req.currentUserId;
  //       const communityId = req.params.communityId;

  //       const deleteCommunity = await communityPostService.deleteCommunity({
  //         communityId,
  //         userId,
  //       });
  //       if (deleteCommunity.errorMessage) {
  //         throw new Error(deleteCommunity, errorMessage);
  //       }
  //       return res.status(200).json(deleteCommunity);
  //     } catch (error) {
  //       return res.status(400).json({ code: 400, message: error.message });
  //     }
  //   }
}

export { communityPostController };
