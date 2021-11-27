const User = require('../../models/User');
const Token = require('../../models/Token');
const errorHandler = require('../../error/errorHandler');
const { generateAccessToken, generateRefreshToken } = require('../../utils/generateToken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user._id, user.firstName, user.lastName, user.email);
      const refreshToken = generateRefreshToken(user._id, user.firstName, user.lastName, user.email);
      // user.token = refreshToken;
      const token = Token({
        token: refreshToken,
        user: user._id,
      });
      await token.save();
      return res.json({
        accessToken,
        refreshToken,
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
