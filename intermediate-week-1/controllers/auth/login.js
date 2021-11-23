const User = require('../../models/User');
const errorHandler = require('../../error/errorHandler');
const { generateAccessToken, generateRefreshToken } = require('../../utils/generateToken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        accessToken: generateAccessToken(user._id, user.firstName, user.lastName, user.email),
        refreshToken: generateRefreshToken(user._id, user.firstName, user.lastName, user.email),
      });

      // next();
    } else {
      return res.sendApiError({
        status: 404,
        title: 'Invalid data!',
        detail: 'Invalid email or password',
      });
    }
  } catch (error) {
    return errorHandler(error, req, res, next);
  }
};

module.exports = login;
