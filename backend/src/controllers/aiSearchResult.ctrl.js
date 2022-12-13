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
}

export { aiSearchResultController };
