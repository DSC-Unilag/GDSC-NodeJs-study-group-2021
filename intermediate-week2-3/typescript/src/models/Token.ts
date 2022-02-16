import { Schema, model, Model, Document, PopulatedDoc } from 'mongoose';
import { mongooseModels } from '../utils/constants';
import { IUser } from './User';

const { USER, TOKEN } = mongooseModels;

export interface IToken extends Document {
  refreshToken: string;
  user: PopulatedDoc<IUser>;
}
const tokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
      required: [true, 'refresh token is required'],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: [true, 'user id is required'],
    },
  },
  { timestamps: true }
);

export const Token: Model<IToken> = model<IToken>(TOKEN, tokenSchema);
