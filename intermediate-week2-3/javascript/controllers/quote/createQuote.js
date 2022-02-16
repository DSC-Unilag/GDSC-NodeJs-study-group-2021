const AppError = require('../../error/appError');
const Quote = require('../../models/Quote');

const createQuote = async (req, res, next) => {
  // creates a quote for a praticular user
  // it takes a single field in the body quote
  // so request body is of the form
  // {
  //    message: "ADJHBFADHBKJA"
  // }
  const { message } = req.body;
  if (!message || String(message).length < 5) {
    return next(new AppError('Quote is required and must be at least 5 characters long', 400));
  }

  try {
    const quote = await Quote.create({
      user: req.user._id,
      quote: message,
    });

    res.status(201).json({
      message: 'quote created successfully',
      quote,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createQuote;
