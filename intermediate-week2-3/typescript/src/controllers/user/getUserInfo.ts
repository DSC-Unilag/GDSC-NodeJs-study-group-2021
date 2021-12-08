import { RequestHandler } from 'express';

const getUserInfo: RequestHandler = (req, res, next) => {
  const { firstName, lastName, email } = req.user;

  return res.status(200).json({
    firstName,
    lastName,
    email,
  });
};

export default getUserInfo;
