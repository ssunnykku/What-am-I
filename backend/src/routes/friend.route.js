import { Router } from 'express';
import { friendController } from '../controllers/friend.ctrl';
import { loginRequired } from '../middlewares/loginRequired.js';

const friendRouter = Router();

friendRouter.post('/', loginRequired, friendController.add);

export { friendRouter };
