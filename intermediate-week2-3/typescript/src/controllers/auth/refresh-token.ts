import { Token } from '../../models/Token';
import User from '../../models/User';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../error/appError';
import { generateAccessToken } from '../../utils/token';
import jwt from 'jsonwebtoken';

// Request: POST
// To: /auth/refresh-token
// Desc: endpoint to refresh access token and generatea new one
const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken }: { refreshToken: string } = req.body;

    if (!refreshToken) {
      return next(new AppError('Provide a valid token', 400));
    }

    const token = await Token.findOne({ refreshToken });

    if (!token) {
      return next(new AppError('Token not valid, please provide a valid token', 400));
    }

    const user = await User.findOne({ _id: token.user });
    if (!user) {
      return next(new AppError('This token is not valid!', 400));
    }

    jwt.verify(token.refreshToken, <string>process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('error');
      } else if (decoded) {
        const accessToken = generateAccessToken(decoded._id);
        return res.json({
          accessToken,
          refreshToken,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

export default refreshAccessToken;
