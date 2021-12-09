import { Router } from 'express';
import createQuote from '../controllers/quote/createQuote';
import deleteQuote from '../controllers/quote/deleteQuote';
import getQuotes from '../controllers/quote/getQuotes';
import getSingleQuote from '../controllers/quote/getSingleQuote';
import updateQuote from '../controllers/quote/updateQuote';
import requireSignIn from '../middlewares/auth';

const router = Router();

router.route('/').get(requireSignIn, getQuotes).post(requireSignIn, createQuote);
router
  .route('/:id')
  .get(requireSignIn, getSingleQuote)
  .delete(requireSignIn, deleteQuote)
  .put(requireSignIn, updateQuote);

export default router;
