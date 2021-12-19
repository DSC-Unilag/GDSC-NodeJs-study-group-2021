import { Schema, model, Model, Document, PopulatedDoc } from 'mongoose';
import { mongooseModels } from '../utils/constants';
import { IUser } from './User';
const { QUOTE, USER } = mongooseModels;

export interface IQuote extends Document {
  user: PopulatedDoc<IUser>;
  quote: string;
}

const quoteSchema = new Schema<IQuote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: [true, 'The user id is required'],
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
    },
  },
  { timestamps: true }
);

const Quote: Model<IQuote> = model<IQuote>(QUOTE, quoteSchema);

export default Quote;
