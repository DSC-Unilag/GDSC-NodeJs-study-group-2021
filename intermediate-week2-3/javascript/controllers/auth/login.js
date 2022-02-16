const User = require('../../models/User');
const AppError = require('../../error/appError');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../../utils/token');

const login = async (req, res, next) => {
  /*send a response with the following format if the login is successful
    *{
        accessToken: **********,
        refreshToken: *********
    }
    */

  const { email, password } = req.body;

  //check that email and password were sent
  if (!email || !password) {
    return next(new AppError('email and password are required', 400));
  }

  //check that user with the email exists

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('User with email not found', 404));
  }

  //check that the passwords match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError('Invalid email or password', 400));
  }

  //generate an accessToken and refresh token for the user.
  const accessToken = createAccessToken(user._id);
  const refreshToken = await createRefreshToken(user._id);

  res.status(200).json({
    accessToken,
    refreshToken: refreshToken.refreshToken,
  });
};

module.exports = login;
