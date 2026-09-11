const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Token = require('../../models/Token');
const AppError = require('../../error/appError');
const { generateAccessToken } = require('../../utils/generateToken');

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.sendApiError({
        title: 'Invalid data!',
        detail: 'Provide a token!',
      });
    }
    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
      return next(new AppError('Token not found. Please log in again', 404));
    }
    const user = await User.findOne({ _id: token.user });
    if (!user) {
      return res.sendApiError({
        status: 404,
        title: 'Invalid data!',
        detail: 'This token is not valid!',
      });
    }
    const decoded = jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded._id, decoded.firstName, decoded.lastName, decoded.email);
    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.mongoError(error);
  }

  /**
     * Takes a parameter 
     * refreshToken 
     * in the body of the request. 
     * 
     * Take that refresh token and send a return a response with a valid access code for that user
     * 
     * response format
     * {
     *       accessToken: **********,
        refreshToken: *********
     * }
     */
};

module.exports = refreshAccessToken;
