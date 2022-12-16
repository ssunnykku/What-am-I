import { Router } from 'express';
import { aiSearchResultController } from '../controllers/aiSearchResult.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const aiSearchResultRouter = Router();
const upload = uploadImageS3();

// 1. ai 분석 요청하기 (사진 업로드)
aiSearchResultRouter.post(
  '/aisearch/:userId',
  upload.single('aiImage'),
  aiSearchResultController.addImage,
);

// 비회원일경우
aiSearchResultRouter.post(
  '/aisearch/notuser/test',
  upload.single('aiImage'),
  aiSearchResultController.searchImage,
);

// 2. Ai 분석 결과 가져오기 (user별)
aiSearchResultRouter.get(
  '/airesult',
  loginRequired,
  aiSearchResultController.myReview,
);

// 3. 선택한 한 개 값에 대한 Ai 분석 결과 가져오기, id: AiSearchResult.model의 id 값
aiSearchResultRouter.get(
  '/airesult/:id',
  loginRequired,
  aiSearchResultController.myResult,
);

// 4. 결과 삭제
aiSearchResultRouter.delete(
  '/airesult/:id',
  loginRequired,
  aiSearchResultController.selectOneResult,
);

export { aiSearchResultRouter };
