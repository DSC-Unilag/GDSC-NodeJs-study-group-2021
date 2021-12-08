const User = require('../../models/User');
const AppError = require('../../error/appError');

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    if (!email) {
      return next(new AppError('email is required', 400));
    }

    if (!password || !passwordConfirm) {
      return next(new AppError('password and password confirm are required', 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new AppError('User with this email already exists!', 400));
    }

    const user = User({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    });

    const createdUser = await user.save();

    if (!createdUser) {
      return next(new AppError('Unable to create user!', 400));
    } else {
      return res.status(201).json({
        message: 'Stored user details successfully',
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};

module.exports = signup;
