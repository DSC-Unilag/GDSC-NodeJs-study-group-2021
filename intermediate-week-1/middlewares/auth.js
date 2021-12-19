const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireSignIn = async (req, res, next) => {
  let token;
  try {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.user = await User.findById(decoded._id);
      next();
    }
  } catch (error) {
    return res.mongoError(error);
  }

  if (!token) {
    res.sendApiError({
      status: 401,
      title: 'Not authorized',
      detail: 'Not authorized, no token',
    });
  }
};
