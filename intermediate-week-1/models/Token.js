const mongoose = require('mongoose');
const constants = require('../utils/constants');

const { TOKEN } = constants.mongooseModels;

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      default: null,
      // select: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'No user!'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(TOKEN, tokenSchema);
