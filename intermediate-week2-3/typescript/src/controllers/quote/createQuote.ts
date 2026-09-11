import Quote from '../../models/Quote';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { CustomRequest } from '../user/getUserInfo';

// Request: POST
// To: /quote/
// Desc: endpoint for creating a post
const createQuote = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { quote }: { quote: string } = req.body;
    if (!quote || quote.length < 5) {
      return next(new AppError('quote should be at least 5 characters', 400));
    }

    const existingQuote = await Quote.findOne({ quote });

    if (existingQuote) {
      return next(new AppError('This quote already exists', 400));
    }

    const newQuote = new Quote({
      user: req.user && req.user._id,
      quote,
    });
    await newQuote.save();
    // return res.status(201).json({ message: 'Quote successfully added!', newQuote });
    return res.status(201).json({ message: 'Quote successfully added!', quote: newQuote });
  } catch (error) {
    return next(error);
  }
};

export default createQuote;
