import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requiredd: [true, 'Please proviedd unique Username'],
      unique: [true, 'Username Exist'],
    },

    password: {
      type: String,
      required: [true, 'Please provied a password'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Please provied unique email'],
      unique: true,
    },
    fristName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('User', UserSchema);

export { Users };
