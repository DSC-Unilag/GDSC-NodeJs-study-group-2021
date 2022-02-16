const Quote = require('../../models/Quote');
const validator = require('validator');
const AppError = require('../../error/appError');

const getSingleQuote = async (req, res, next) => {
  // gets a quote by id
  // populates the user field
  // it takes the quoteId in the request params

  const { quoteId } = req.params;

  if (!quoteId) {
    return next(new AppError('quoteId is required', 400));
  }

  if (!validator.isMongoId(quoteId)) {
    return next(new AppError('invalud id provided', 400));
  }

  try {
    //get quote
    const quote = await Quote.findOne({
      _id: quoteId,
      user: req.user._id,
    }).populate('user');

    if (!quote) {
      return next(new AppError('quote not found', 404));
    }
    res.status(200).json({
      message: 'quote fetched successfully',
      quote,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleQuote;
