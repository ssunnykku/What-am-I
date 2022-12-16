import { AiSearchResult } from '../models/AiSearchResult.model';
import { Prediction } from '../models/Prediction.model';
import { db } from '../models/index';
import { LakeFormation } from 'aws-sdk';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

class aiSearchResultService {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async createResult({ aiImage, dogName, userId, predictions }) {
    try {
      const info = await AiSearchResult.create(
        {
          userId,
          dogName,
          aiImage,
        },
        // { transaction: t },
      );
      // console.log('1', info);
      const findInfo = await AiSearchResult.findOne({
        where: { userId, aiImage },
      });
      // console.log(findInfo);
      // throw Error('에러발생');

      const predictResult = [];
      for await (const result of predictions) {
        const searchResult = await Prediction.create(
          {
            aiResultId: findInfo.id,
            predictId: result.id,
            label: result.label,
            score: result.score,
            rank: result.rank,
          },
          // { transaction: t },
        );
        predictResult.push(searchResult);
      }

      await Promise.all(predictResult); //비동기
      // await t.commit();
      return predictResult;
    } catch (error) {
      console.log(error);
      // await t.rollback();
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
        right: true,
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
          right: true,
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
