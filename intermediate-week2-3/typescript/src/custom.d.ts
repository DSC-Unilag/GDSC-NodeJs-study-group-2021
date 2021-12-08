import { IUser } from './models/User';

//allows me to user req.user in the requests handlers.

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
