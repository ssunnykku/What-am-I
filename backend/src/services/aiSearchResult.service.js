import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';
import { db } from '../models/index';

class aiSearchResultService {
  static async createResult({ aiImage, dogName, userId, predictions }) {
    // const t = await db.sequelize.transaction();

    try {
      const info = await AiSearchResult.create(
        {
          userId,
          dogName,
          aiImage,
        },
        // { transaction: t },
      );

      const findInfo = await AiSearchResult.findOne({
        where: { userId, aiImage },
      });

      // console.log(findInfo);
      // throw Error('에러발생');
      const predictResult = [];
      for await (const result of predictions) {
        const a = await Prediction.create(
          {
            aiResultId: findInfo.id,
            predictId: result.id,
            label: result.label,
            score: result.score,
            rank: result.rank,
          },
          // { transaction: t },
        );
        predictResult.push(a);
      }

      // console.log(predictResult);
      await Promise.all(predictResult); //비동기
      // await t.commit();
      return predictResult;
    } catch (error) {
      console.log(error);
      // await t.rollback();
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
