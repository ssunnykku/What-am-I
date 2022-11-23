import express from 'express';
import { communityCtrl } from '../controllers';

const router = express.Router();

router.get('/', communityCtrl.getCommunityList);
router.post('/', communityCtrl.createCommunity);

export default router;
