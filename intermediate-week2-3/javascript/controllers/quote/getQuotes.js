const Quote = require('../../models/Quote');

const getQuotes = async (req, res, next) => {
  // get all quotes given by a user
  // it returns a paginated response
  // it takes the page and limit as query parameters
  // limit is the maximum number of items per page.

  let { page, limit } = req.query;

  //convert them to integers. If there's an error give them default values.
  // e.g if someone enters page as 'ab' then parseInt will return nan then based on the statment below it will default to 1.
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  //in case page or limit are less than 1 we make them 1.
  page = Math.max(1, page);
  limit = Math.max(1, limit);

  try {
    //get paginated result and sort in order of most recent
    const quotes = await Quote.find({ user: req.user._id })
      .sort('-updatedAt')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalResults = await Quote.countDocuments({ user: req.user._id });
    const totalPages = Math.ceil(totalResults / limit);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null; //check out ternary operators in javascript to understand the statements here

    res.status(200).json({
      totalResults,
      totalPages,
      currentPage: page,
      prevPage,
      nextPage,
      results: quotes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getQuotes;
