import { Router } from 'express';
import { communityLikeController } from '../controllers/communityLike.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const communityLikeRouter = Router();

communityLikeRouter.post('/', loginRequired, communityLikeController.addLike);
// communityLikeRouter.delete(
//   '/',
//   loginRequired,
//   communityLikeController.cancelLike,
// );
// communityLikeRouter.get('/', loginRequired, communityLikeController.getLike);

export { communityLikeRouter };
