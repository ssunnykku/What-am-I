import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';

class aiSearchResultService {
  static async createResult({ dogName, userId, predictions }) {
    const info = await AiSearchResult.create({
      userId,
      dogName,
    });

    const findInfo = await AiSearchResult.findOne({
      where: { userId, dogName },
    });

    const predictResult = await predictions.map((result) => {
      console.log(result.label);
      Prediction.create({
        aiResultId: findInfo.id,
        predictId: result.id,
        label: result.label,
        score: result.score,
        rank: result.rank,
      });
    });

    return predictions;
  }

  static async getMyResults(userId) {
    const result = await AiSearchResult.findAll({
      where: { userId: userId },
      include: [
        {
          model: Prediction,
        },
      ],
    });
    return result;
  }
}

export { aiSearchResultService };
