const AppError = require('../../error/appError');
const User = require('../../models/User');

const signup = async (req, res, next) => {
  /**
   * takes the following fields in the body
   *
   * firstName
   * lastName
   * email
   * password
   * passwordConfirm
   *
   * and saves it to the MongoDB database
   *
   */

  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  if (!email) {
    return next(new AppError('email is required', 400));
  }

  if (!password || !passwordConfirm) {
    return next(new AppError('password and password confirm are required', 400));
  }

  if (passwordConfirm !== password) {
    return next(new AppError('passwords dont match', 400));
  }

  //save the user details to the database
  await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    message: 'Stored user details successfully',
  });
};

module.exports = signup;
