import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';

class aiSearchResultService {
  static async createResult({ aiImage, dogName, userId, predictions }) {
    try {
      const info = await AiSearchResult.create({
        userId,
        dogName,
        aiImage,
      });
      const findInfo = await AiSearchResult.findOne({
        where: { userId, aiImage },
      });

      const predictResult = [];
      for await (const result of predictions) {
        const searchResult = await Prediction.create({
          aiResultId: findInfo.id,
          predictId: result.id,
          label: result.label,
          score: result.score,
          rank: result.rank,
        });
        predictResult.push(searchResult);
      }

      await Promise.all(predictResult); //비동기

      return predictResult;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMyResults(userId) {
    const result = await AiSearchResult.findAll({
      where: { userId: userId },
      include: [
        {
          model: Prediction,
          right: true,
        },
      ],
    });
    // console.log(result);
    return result;
  }
}

export { aiSearchResultService };
