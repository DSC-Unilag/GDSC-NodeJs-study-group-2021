import Quote from '../../models/Quote';
import { Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

// Request: GET
// To: /quote/:id
// Desc: endpoint for getting a quote based on specified id
const getSingleQuote = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote) {
      return next(new AppError("Quote with this id doesn't exist", 400));
    }
    return res.json(quote);
  } catch (error) {
    return next(error);
  }
};

export default getSingleQuote;
