import { AiSearchResult } from '../models/AiSearchResult.model';

class aiSearchResultService {
  static async createResult({ dogName, aiResult, aiImage, userId }) {
    const result = await AiSearchResult.create({
      dogName,
      aiResult: '결과값~~',
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
