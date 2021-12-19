import { Router } from 'express';
import login from '../controllers/auth/login';
import refreshAccessToken from '../controllers/auth/refresh-token';
import signup from '../controllers/auth/signup';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

export default router;
