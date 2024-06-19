import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requiredd: [true, 'Please proviedd unique Username'],
      unique: [true, 'Username Exist'],
    },
  },
  {
    timestamps: true,
  }
);
