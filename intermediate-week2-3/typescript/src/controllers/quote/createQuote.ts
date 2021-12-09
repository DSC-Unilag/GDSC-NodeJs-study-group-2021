import Quote from '../../models/Quote';
import { Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

const createQuote = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { quote }: { quote: string } = req.body;
    if (!quote) {
      return next(new AppError('Please provide a quote', 400));
    }

    const existingQuote = await Quote.findOne({ quote });

    if (existingQuote) {
      return next(new AppError('This quote already exists', 400));
    }

    const newQuote = new Quote({
      user: req.user,
      quote,
    });
    await newQuote.save();
    return res.json({ message: 'Quote successfully added!' });
  } catch (error) {
    return next(error);
  }
};

export default createQuote;
