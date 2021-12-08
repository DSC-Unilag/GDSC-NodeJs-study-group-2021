import jwt from 'jsonwebtoken';

export const generateAccessToken = (_id: string) => {
  return jwt.sign(
    {
      _id,
    },
    <string>process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

export const generateRefreshToken = (_id: string) => {
  return jwt.sign(
    {
      _id,
    },
    <string>process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
};
