const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('../models/Token');

exports.createAccessToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return accessToken;
};

exports.createRefreshToken = async (id) => {
  //create a random string as refresh token.
  const refreshToken = crypto.randomBytes(32).toString('hex');
  const token = await Token.create({
    refreshToken,
    user: id,
  });

  return token;
};
