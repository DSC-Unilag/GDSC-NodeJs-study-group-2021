const Token = require('../../models/Token');
const { createAccessToken } = require('../../utils/token');
const AppError = require('../../error/appError');

const refreshAccessToken = async (req, res, next) => {
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

  //get the refresh token
  const { refreshToken } = req.body;

  const token = await Token.findOne({ refreshToken });

  if (!token) {
    return next(new AppError('Token not found. Please log in again', 404));
  }

  const accessToken = createAccessToken(token.user);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
};

module.exports = refreshAccessToken;
