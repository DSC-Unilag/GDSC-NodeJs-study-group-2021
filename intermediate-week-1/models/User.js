const mongoose = require('mongoose');
const validator = require('validator');
const constants = require('../utils/constants');
const bcrypt = require('bcrypt')

const { USER } = constants.mongooseModels;

const userSchema = mongoose.Schema(
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
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  //If password is not modified then skip
  if (!this.isModified('password')) {
    return next();
  }

  //if password is modified then change hash the password and save it.
  this.password = await bcrypt.hash(this.password, 8) 
  //also remove the passwordConfirm.
  this.passwordConfirm = undefined;

  next();
});


userSchema.methods.compareSecurePassword = function compareSecurePasswords(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model(USER, userSchema);
