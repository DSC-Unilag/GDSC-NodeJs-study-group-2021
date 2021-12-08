const login = require('../controllers/auth/login');
const refreshAccessToken = require('../controllers/auth/refresh-token');
const signup = require('../controllers/auth/signup');
const { requireSignIn } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refresh-token', refreshAccessToken);
router.post('/test', requireSignIn, (req, res) => {
  res.status(200).json({
    message: 'success',
  });
});

module.exports = router;
