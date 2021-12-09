import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../models/User';

export interface CustomRequest extends Request {
  user?: IUser;
}

const getUserInfo = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email } = req.user as IUser;

    return res.status(200).json({
      firstName,
      lastName,
      email,
    });
  } catch (error) {
    return next(error);
  }
};

export default getUserInfo;
