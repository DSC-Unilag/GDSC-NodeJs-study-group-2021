import AppError from '../error/appError';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../controllers/user/getUserInfo';

const requireSignIn = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;
  try {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET as string, async function (err, decoded) {
        if (err) {
          next(err);
        } else if (decoded) {
          const { _id } = decoded;

          try {
            const user = await User.findById(_id);

            req.user = user as IUser; //normally this line would not work. thats why we used the custom.d.ts file.
            //try looking in it to see what we did.
          } catch (error) {
            return next(error);
          }

          next();
        }
      });
    }
  } catch (error) {
    return next(error);
  }

  if (!token) {
    return next(new AppError('No token found', 400));
  }
};

export default requireSignIn;
