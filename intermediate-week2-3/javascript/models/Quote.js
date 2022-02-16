const mongoose = require('mongoose');
const constants = require('../utils/constants');
const { QUOTE, USER } = constants.mongooseModels;

const quoteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER,
      required: [true, 'The user id is required'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(QUOTE, quoteSchema);
