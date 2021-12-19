const User = require('../../models/User');
const Token = require('../../models/Token');
const { generateAccessToken, generateRefreshToken } = require('../../utils/generateToken');
const AppError = require('../../error/appError');


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('email and password are required', 400));
    }

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
      return next(new AppError('User with email not found', 404));
    }
  } catch (error) {
    return res.mongoError(error);
  }
}

module.exports = login;
