import Quote from '../../models/Quote';
import User from '../../models/User';
import { Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

// Request: PUT
// To: /quote/:id
// Desc: endpoint for updating a quote based on specified id
const updateQuote = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote) {
      return next(new AppError("Quote with this id doesn't exist", 400));
    }
    const user = await User.findById(quote.user);
    if (user) {
      if (req.user && user.id !== req.user.id) {
        return next(new AppError("You cannot update another person's quote", 400));
      }
      quote.quote = req.body.quote;
      await quote.save();
      return res.json({ message: 'Quote successfully updated' });
    } else {
      return next(new AppError("User doesn't exist", 400));
    }
  } catch (error) {
    return next(error);
  }
};

export default updateQuote;
