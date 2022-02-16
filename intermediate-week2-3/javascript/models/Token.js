const mongoose = require('mongoose');
const constants = require('../utils/constants');

const { USER, TOKEN } = constants.mongooseModels;

const tokenSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: [true, 'refresh token is required'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER,
      required: [true, 'user id is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(TOKEN, tokenSchema);
