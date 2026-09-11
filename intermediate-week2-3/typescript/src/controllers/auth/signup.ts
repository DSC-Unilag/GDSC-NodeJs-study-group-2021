import User from '../../models/User';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';

// Request: POST
// To: /auth/signup
// Desc: endpoint for user registration
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    }: { firstName: string; lastName: string; email: string; password: string; passwordConfirm: string } = req.body;

    if (!email) {
      return next(new AppError('email is required', 400));
    }

    if (!password || !passwordConfirm) {
      return next(new AppError('password and password confirm are required', 400));
    }

    if (passwordConfirm !== password) {
      return next(new AppError('passwords dont match', 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new AppError('User with this email already exists!', 400));
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    if (!user) {
      return next(new AppError('Unable to create user!', 400));
    }

    await user.save();
    return res.status(201).json({ message: 'Stored user details successfully' });
  } catch (error) {
    return next(error);
  }
};

export default signup;
