import express from 'express';
import { communityCtrl } from '../controllers';

const router = express.Router();

router.get('/', communityCtrl.getCommunityList);

export default router;
