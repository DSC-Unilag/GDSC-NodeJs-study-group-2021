import Quote from '../../models/Quote';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';

// Request: GET
// To: /quote/
// Desc: endpoint for getting all posts from DB
const getQuotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await Quote.find({});
    if (!quotes) {
      return next(new AppError('Something went wrong', 422));
    }
    return res.json(quotes);
  } catch (error) {
    return next(error);
  }
};

export default getQuotes;
