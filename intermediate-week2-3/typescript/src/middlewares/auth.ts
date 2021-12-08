import AppError from '../error/appError';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { RequestHandler } from 'express';

const requireSignIn: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError('Authentication is required', 401));
  }
  if (!String(authorization).startsWith('Bearer')) {
    return next(new AppError('Please use bearer token', 400));
  }

  const [bearer, token] = authorization.split(' ');

  /**
   * verify the token and verify if user is logged in in or not
   * If user is logged in then call the next() function to go to the next middleware
   */

  jwt.verify(token, process.env.JWT_SECRET as string, async function (err, decoded) {
    if (err) {
      next(err);
    }

    const { id } = decoded;

    try {
      const user = await User.findById(id);

      req.user = user as IUser; //normally this line would not work. thats why we used the custom.d.ts file.
      //try looking in it to see what we did.
    } catch (error) {
      return next(error);
    }

    next();
  });
};

export default requireSignIn;
