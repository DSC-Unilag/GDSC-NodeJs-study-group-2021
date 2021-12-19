import { Router } from 'express';
import getUserInfo from '../controllers/user/getUserInfo';
import requireSignIn from '../middlewares/auth';

const router = Router();

router.get('/', requireSignIn, getUserInfo);

export default router;
