const AppError = require('../error/appError');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireSignIn = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError('Authentication is required', 401));
  }
  if (!String(authorization).startsWith('Bearer')) {
    return next(new AppError('Please use bearer token', 400));
  }

  const [bearer, token] = authorization.split(' ');

  /**
   * verify the token and verify if user is logged in in or not
   * If user is logged in then call the next() function to go to the next middleware
   */

  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      next(err);
    }

    const { id } = decoded;

    try {
      const user = await User.findById(id);

      req.user = user;
    } catch (error) {
      return next(error);
    }

    next();
  });
};
