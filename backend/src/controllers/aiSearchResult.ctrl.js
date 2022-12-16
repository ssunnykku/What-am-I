import { aiSearchResultService } from '../services/aiSearchResult.service';
import axios from 'axios';

class aiSearchResultController {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async addImage(req, res, next) {
    try {
      const userId = req.params.userId;
      const { dogName } = req.body;
      const image = req.file;
      const aiImage = image == undefined ? null : image.location;
      let predictions = null;

      // ai 분석 post
      const predictResponse = await axios
        .post(`${process.env.RESPONSE_POST_URL}/v1/predict`, {
          url: aiImage,
        })
        .then((res) => (predictions = res.data));
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

  static async searchImage(req, res, next) {
    try {
      const { dogName } = req.body;
      const image = req.file;
      const aiImage = image == undefined ? null : image.location;

      let result = null;

      // ai 분석 post
      const justSearch = await axios
        .post(`${process.env.RESPONSE_POST_URL}/v1/predict`, {
          url: aiImage,
        })
        .then((res) => (result = res.data));
      const data = result.map((predict, index) => {
        predict.rank = index;
      });

      return res.status(200).send({ dogName, result });
    } catch (error) {
      next(error);
    }
  }

  //  2. Ai 분석 결과 가져오기
  static async myReview(req, res, next) {
    try {
      const { page } = req.query;
      const defaultPage = page || 1;
      const userId = req.currentUserId;
      const getMyImages = await aiSearchResultService.getMyResults(
        userId,
        defaultPage,
      );

      return res.status(200).send(getMyImages);
    } catch (error) {
      next(error);
    }
  }
  // 3. 선택한 한 개 값에 대한 Ai 분석 결과 가져오기
  static async myResult(req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.params.id;
      const getOneResult = await aiSearchResultService.findOneResult(
        userId,
        id,
      );

      return res.status(200).send(getOneResult);
    } catch (error) {
      next(error);
    }
  }
  // 4. 결과 삭제
  static async selectOneResult(req, res, next) {
    try {
      const userId = req.currentUserId;

      const id = req.params.id;

      const getOneResult = await aiSearchResultService.getOne({ userId, id });
      if (getOneResult.errorMessage) {
        throw new Error(getOneResult, errorMessage);
      }

      return res.status(200).send(getOneResult);
    } catch (error) {
      next(error);
    }
  }
}

export { aiSearchResultController };
