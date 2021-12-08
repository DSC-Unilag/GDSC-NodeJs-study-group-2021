const Quote = require('../../models/Quote');
const validator = require('validator');
const AppError = require('../../error/appError');

const updateQuote = async (req, res, next) => {
  // udpates a quote
  // populates the user field
  // it takes the quoteId in the request params
  // it takes the new vaue of quote in the body

  const { quoteId } = req.params;
  const { message } = req.body;
  if (!message || String(message).length < 5) {
    return next(new AppError('Quote is required and must be at least 5 characters long', 400));
  }
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

    quote.quote = message;
    await quote.save();

    res.status(200).json({
      message: 'update successful',
      quote,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateQuote;
