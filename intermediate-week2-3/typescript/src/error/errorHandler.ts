const environment = process.env.NODE_ENV;
import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const data: any = {
    status: 'error',
    message: err.message,
  };
  if (environment === 'development') {
    data.error = err.stack;
  }
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (environment !== 'development' && err.statusCode === 500) {
    data.message = 'Something went very wrong';
  }
  logger.error(err.message);
  res.status(err.statusCode).json(data);
};

export default errorHandler;
