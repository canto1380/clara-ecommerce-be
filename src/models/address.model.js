import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    as: {
      type: String,
      trim: true,
      minlength: [3, "As must be greater than 6 characters"],
      maxlength: [20, "As must be less than 20 characters"],
      required: true
    },
    nameAddress: {
      type: String,
      trim: true,
      required: [true, "Name Address is required"],
      minlength: [3, "Name Address must be greater than 3 characters"],
      maxlength: [60, "Name Address must be less than 60 characters"],
    },
    number: {
      type: Number,
      trim: true,
      required: [true, "Number is required"],
    },
    apartament: {
      type: String,
      trim: true,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true
    },
    idLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    cp: {
      type: String,
      trim: true,
      required: [true, "Zip Code is required"],
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
