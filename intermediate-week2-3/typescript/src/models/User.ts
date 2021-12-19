import { Schema, model, Model, Document } from 'mongoose';
import { mongooseModels } from '../utils/constants';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const user = this;

  bcrypt.genSalt(10, (err: unknown, salt: string) => {
    bcrypt.hash(user.password, salt, (err: unknown, hash: string) => {
      user.password = hash;
      next();
    });
  });
});

const User: Model<IUser> = model<IUser>(USER, userSchema);

export default User;
