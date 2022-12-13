import { aiSearchResultService } from '../services/aiSearchResult.service';

class aiSearchResultController {
  static async addImage(req, res, next) {
    try {
      const userId = req.currentUserId;
      const { dogName, aiResult } = req.body;
      const image = req.file;

      const aiImage = image == undefined ? null : image.location;

      const searchResult = await aiSearchResultService.createResult({
        dogName,
        aiResult,
        aiImage,
        userId,
      });
      return res.status(201).send(searchResult);
    } catch (error) {
      next(error);
    }
  }

  static async myReview(req, res, next) {
    try {
      const userId = req.currentUserId;
      const getMyImages = await aiSearchResultService.getMyResults();
      return res.status(200).send(getMyImages);
    } catch (error) {
      next(error);
    }
  }
}

export { aiSearchResultController };
