import { Router } from 'express';
import { aiSearchResultController } from '../controllers/aiSearchResult.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';
import { uploadImageS3 } from '../middlewares/uploadImageS3';

const aiSearchResultRouter = Router();
const upload = uploadImageS3();

aiSearchResultRouter.post(
  '/aisearch',
  loginRequired,
  upload.single('aiImage'),
  aiSearchResultController.addImage,
);

export { aiSearchResultRouter };
