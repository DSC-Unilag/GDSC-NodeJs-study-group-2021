const { requireSignIn } = require('../middlewares/auth');
const router = require('express').Router();
const getQuotes = require('../controllers/quote/getQuotes');
const getSingleQuote = require('../controllers/quote/getSingleQuote');
const updateQuote = require('../controllers/quote/updateQuote');
const createQuote = require('../controllers/quote/createQuote');
const deleteQuote = require('../controllers/quote/deleteQuote');

router.use(requireSignIn);

router.route('/').get(getQuotes).post(createQuote);

router.route('/:quoteId').get(getSingleQuote).delete(deleteQuote).patch(updateQuote);

module.exports = router;
