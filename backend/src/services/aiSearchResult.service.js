import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';
import { LakeFormation } from 'aws-sdk';

class aiSearchResultService {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async createResult({ aiImage, dogName, userId, predictions }) {
    // const t = await db.sequelize.transaction();

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
      for (const result of predictions) {
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

  //  2. Ai 분석 결과 가져오기
  static async getMyResults(userId, defaultPage) {
    const result = await AiSearchResult.findAndCountAll({
      where: {
        userId: userId,
      },
      limit: 10,
      offset: (defaultPage - 1) * 10,
      include: {
        model: Prediction,
      },
      order: [['id', 'DESC']],
    });

    return result;
  }
  // 3. 선택한 한 개 값에 대한 Ai 분석 결과 가져오기
  static async findOneResult(userId, id) {
    const result = await AiSearchResult.findOne({
      where: { userId, id },
      include: [
        {
          model: Prediction,
        },
      ],
    });
    return result;
  }
  // 4. 결과 삭제
  static async getOne({ id, userId }) {
    const findOneResult = await AiSearchResult.findOne({
      where: { id: Number(id), userId },
    });

    if (!findOneResult) {
      const errorMessage = '결과값을 찾을 수 없습니다.';
      return errorMessage;
    }
    const result = await AiSearchResult.destroy({
      where: { id: findOneResult.id, userId: findOneResult.userId },
    });
    return `삭제되었습니다.`;
  }
}

export { aiSearchResultService };
