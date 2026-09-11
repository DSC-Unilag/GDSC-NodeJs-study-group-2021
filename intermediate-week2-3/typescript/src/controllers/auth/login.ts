import User from '../../models/User';
import { Token } from '../../models/Token';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../../utils/token';

// Request: POST
// To: /auth/login
// Desc: endpoint for user login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      return next(new AppError('email and password are required', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AppError('Invalid email or password', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const token = new Token({
        refreshToken: generateRefreshToken(user._id),
        user: user._id,
      });
      await token.save();
      return res.json({
        accessToken: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      });
    } else {
      return next(new AppError('Invalid email or password', 400));
    }
  } catch (error) {
    return next(error);
  }
};

export default login;
