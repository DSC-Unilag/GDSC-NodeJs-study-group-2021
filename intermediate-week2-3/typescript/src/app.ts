import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './error/errorHandler';
import AppError from './error/appError';
import morgan from 'morgan';

//getting all routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import quoteRoutes from './routes/quote';

const app = express();

//setting up app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello there, This is your SECOND assignment in the GDSC NodeJs intermediate study group',
  });
});

//setting up all routers
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/quote', quoteRoutes);

//for invalid route
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new AppError('Specified route does no exist on this server', 404));
});

//error handler
app.use(errorHandler);

export default app;
