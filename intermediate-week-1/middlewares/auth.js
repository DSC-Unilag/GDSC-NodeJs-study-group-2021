const jwt = require('jsonwebtoken');
const errorHandler = require('../error/errorHandler');
const User = require('../models/User');

exports.requireSignIn = async (req, res, next) => {
  let token;
  try {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    }
  } catch (error) {
    return errorHandler(error, req, res, next);
  }

  if (!token) {
    res.sendApiError({
      status: 401,
      title: 'Not authorized',
      detail: 'Not authorized, no token',
    });
  }

  /**
   * veify the token and verify if user is logged in in or not
   * If user is logged in then call the next() function to go to the next middleware
   */
};
