const jwt = require('jsonwebtoken');

exports.generateAccessToken = (_id, firstName, lastName, email) => {
  return jwt.sign(
    {
      _id,
      firstName,
      lastName,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

exports.generateRefreshToken = (_id, firstName, lastName, email) => {
  return jwt.sign(
    {
      _id,
      firstName,
      lastName,
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
};
