import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      minlength: [13, "Email must be greater than 13 characters"],
      maxlength: [60, "Email must be less than 40 characters"],
    },
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "Name must be greater than 3 characters"],
      maxlength: [30, "Name must be less than 30 characters"],
    },
    surname: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "Surname must be greater than 3 characters"],
      maxlength: [30, "Surname must be less than 30 characters"],
    },
    nickname: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    phone: {
      type: Number,
      trim: true,
      minlength: [10, "Phone must be greater than 10 characters"],
      maxlength: [12, "Phone must be less than 12 characters"],
    },
    birthdate: {
      type: Date,
    },
    supplier: {
      type: String,
      trim: true,
      required: true,
      default: "personal",
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    emailValidate: {
      type: Boolean,
      default: false,
    },
    passExpiration: {
      type: Date,
    },
    lastSession: {
      type: String,
    },
    lastPassIncorrect: {
      type: String,
    },
    counterPassIncorrect: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 8);
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRED,
  });
  const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRED,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
