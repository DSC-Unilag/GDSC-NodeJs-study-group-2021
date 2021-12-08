const getUserInfo = require('../controllers/user/getUserInfo');
const { requireSignIn } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', requireSignIn, getUserInfo);

module.exports = router;
