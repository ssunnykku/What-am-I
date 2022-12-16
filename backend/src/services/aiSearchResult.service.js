import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';

class aiSearchResultService {
  static async createResult({ dogName, userId, prediction, aiImage }) {
    console.log(prediction);
    const result = await AiSearchResult.create({
      dogName,
      aiResult: prediction,
      aiImage,
      userId,
    });
    return result;
  }

  static async getMyResults(userId) {
    const result = await AiSearchResult.findAll({ where: { userId: userId } });
    return result;
  }
}

export { aiSearchResultService };
