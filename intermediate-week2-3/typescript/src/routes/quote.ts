import { Router } from 'express';
import createQuote from '../controllers/quote/createQuote';
import deleteQuote from '../controllers/quote/deleteQuote';
import getQuotes from '../controllers/quote/getQuotes';
import getSingleQuote from '../controllers/quote/getSingleQuote';
import updateQuote from '../controllers/quote/updateQuote';
import requireSignIn from '../middlewares/auth';

const router = Router();

router.use(requireSignIn);

router.route('/').get(getQuotes).post(createQuote);
router.route('/:id').get(getSingleQuote).delete(deleteQuote).put(updateQuote);

export default router;
