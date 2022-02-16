import { Schema, model, Model, Document } from 'mongoose';
import { mongooseModels } from '../utils/constants';
import validator from 'validator';

const { USER } = mongooseModels;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string | null | undefined;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = model<IUser>(USER, userSchema);

export default User;
