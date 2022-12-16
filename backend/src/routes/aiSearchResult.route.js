import { Router } from 'express';
import { aiSearchResultController } from '../controllers/aiSearchResult.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const aiSearchResultRouter = Router();
const upload = uploadImageS3();

// 1. ai 분석 요청하기 (사진 업로드) 비회원도 이용 가능
aiSearchResultRouter.post(
  '/aisearch',
  upload.single('aiImage'),
  aiSearchResultController.addImage,
);

// aiSearchResultRouter.post(
//   '/v1/predict',
//   upload.single('url'),
//   aiSearchResultController.addImage2,
// );

// aiSearchResultRouter.get('/', aiSearchResultController.myReview);

// 2. 내가 남긴 리뷰 리스트 가져오기
aiSearchResultRouter.get(
  '/airesult',
  loginRequired,
  aiSearchResultController.myReview,
);

export { aiSearchResultRouter };
