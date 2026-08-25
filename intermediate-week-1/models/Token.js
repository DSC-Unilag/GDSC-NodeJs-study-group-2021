const mongoose = require('mongoose');
const constants = require('../utils/constants');

const { TOKEN } = constants.mongooseModels;

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      default: null,
      required: [true, 'token is required!'],
      // select: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user id is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(TOKEN, tokenSchema);
