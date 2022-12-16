import { aiSearchResultService } from '../services/aiSearchResult.service';
import axios from 'axios';

class aiSearchResultController {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async addImage(req, res, next) {
    try {
      const userId = req.params.userId == ':userId' ? null : req.params.userId;

      const { dogName } = req.body;
      const image = req.file;
      const aiImage = image == undefined ? null : image.location;
      let predictions = null;

      // ai 분석 post
      const start = Date.now();
      const predictResponse = await axios
        .post(`${process.env.RESPONSE_POST_URL}/v1/predict`, {
          url: aiImage,
        })
        .then((res) => (predictions = res.data));
      const end = Date.now();
      console.log('실행시간', (end - start) / 1000);
      const data = predictions.map((predict, index) => {
        predict.rank = index;
      });

      const searchResult = await aiSearchResultService.createResult({
        dogName,
        aiImage,
        userId,
        predictions,
      });
      return res.status(201).send(searchResult);
    } catch (error) {
      next(error);
    }
  }

  //  2. Ai 분석 결과 가져오기
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
