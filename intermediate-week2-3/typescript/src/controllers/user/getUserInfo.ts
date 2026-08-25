import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../models/User';

export interface CustomRequest extends Request {
  user?: IUser;
}

// Request: GET
// To: /user/
// Desc: endpoint to get information about logged in user
const getUserInfo = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email } = <IUser>req.user;

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
