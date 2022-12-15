import { aiSearchResultService } from '../services/aiSearchResult.service';

class aiSearchResultController {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async addImage(req, res, next) {
    try {
      const userId = req.currentUserId || null;
      const { dogName } = req.body;
      const image = req.file;
      // const aiImage = image == undefined ? null : image.transforms[0].location;
      const aiImage = image == undefined ? null : image.location;

      const searchResult = await aiSearchResultService.createResult({
        dogName,
        aiImage,
        userId,
      });
      return res.status(201).send(searchResult);
    } catch (error) {
      next(error);
    }
  }

  static async addImage2(req, res, next) {
    try {
      const image = req.file;
      // const aiImage = image == undefined ? null : image.transforms[0].location;
      const uploadImage = image == undefined ? null : image.location;

      // const searchResult = await aiSearchResultService.createResult2({
      //   uploadImage,
      // });
      return res.status(200).json({ url: uploadImage });
    } catch (error) {
      next(error);
    }
  }

  // static async myReview2(req, res, next) {
  //   try {
  //     const userId = req.currentUserId;
  //     const getMyImages = await aiSearchResultService.getMyResults(userId);
  //     return res.status(200).send(getMyImages);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //  2. 내가 남긴 리뷰 리스트 가져오기
  static async myReview(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getMyImages = await aiSearchResultService.getMyResults(userId);
      return res.status(200).send(getMyImages);
    } catch (error) {
      next(error);
    }
  }
}

export { aiSearchResultController };
