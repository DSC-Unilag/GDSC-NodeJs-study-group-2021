import Quote from '../../models/Quote';
import User from '../../models/User';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

// Request: PUT
// To: /quote/:id
// Desc: endpoint for updating a quote based on specified id
const updateQuote = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { quote } = req.body;
    if (!quote || quote.length < 5) {
      return next(new AppError('quote should be at least 5 characters', 400));
    }
    const foundQuote = await Quote.findById(id).populate('user');
    if (!foundQuote) {
      return next(new AppError("Quote with this id doesn't exist", 400));
    }

    // if (req.user && req.user !== foundQuote.user.id) {
    //   return next(new AppError("You cannot update another person's quote", 400));
    // }

    foundQuote.quote = quote;
    await foundQuote.save();
    return res.json({ message: 'Quote successfully updated', foundQuote });
  } catch (error) {
    return next(error);
  }
};

export default updateQuote;
