import { aiSearchResultService } from '../services/aiSearchResult.service';
import axios from 'axios';

class aiSearchResultController {
  // 1. ai 분석 요청하기 (사진 업로드)
  static async addImage(req, res, next) {
    try {
      const userId = req.currentUserId || null;
      const { dogName } = req.body;
      const image = req.file;
      // const aiImage = image == undefined ? null : image.transforms[0].location;
      const aiImage = image == undefined ? null : image.location;
      let prediction = null;
      const predictResponse = await axios
        .post(`${process.env.RESPONSE_POST_URL}/v1/predict`, {
          url: aiImage,
        })
        .then((res) => {
          prediction = res.data[0].label;
          console.log(res.data);
        });

      const searchResult = await aiSearchResultService.createResult({
        dogName,
        aiImage,
        userId,
        prediction,
      });
      return res.status(201).send(searchResult);
    } catch (error) {
      next(error);
    }
  }

  // static async myReview2(req, res, next) {
  //   try {
  //     const userId = req.currentUserId;
  //     const getMyImages = await aiSearchResultService.getMyResults(userId);
  //     return res.status(200).send(getMyImages);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //  2. 내가 남긴 리뷰 리스트 가져오기
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
