const Quote = require('../../models/Quote');
const validator = require('validator');
const AppError = require('../../error/appError');

const deleteQuote = async (req, res, next) => {
  // gets a quote by id
  // populates the user field
  // it takes the quoteId in the request params
  // it then deletes the quote

  const { quoteId } = req.params;

  if (!quoteId) {
    return next(new AppError('quoteId is required', 400));
  }

  if (!validator.isMongoId(quoteId)) {
    return next(new AppError('invalud id provided', 400));
  }

  try {
    //get quote
    await Quote.deleteMany({
      _id: quoteId,
      user: req.user._id,
    });

    res.status(200).json({
      message: 'delete successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteQuote;
