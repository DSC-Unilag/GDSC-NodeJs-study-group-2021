import Quote from '../../models/Quote';
import { Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

// Request: GET
// To: /quote/
// Desc: endpoint for getting all posts from DB
const getQuotes = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const quotes = await Quote.find({});
    return res.json(quotes);
  } catch (error) {
    return next(error);
  }
};

export default getQuotes;
