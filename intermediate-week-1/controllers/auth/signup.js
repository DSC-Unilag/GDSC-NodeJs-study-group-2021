const User = require('../../models/User');
const errorHandler = require('../../error/errorHandler');

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.sendApiError({
        title: 'Existing data!',
        detail: 'User exists!',
      });
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
      return res.sendApiError({
        title: 'ERROR!',
        detail: 'Unable to create user!',
      });
    } else {
      return res.status(201).json({
        message: 'Stored user details successfully',
      });
    }
  } catch (error) {
    return errorHandler(error, req, res, next);
  }
};

module.exports = signup;
