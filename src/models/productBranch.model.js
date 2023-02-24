import mongoose, { Schema } from "mongoose";
import Branch from "./branch.model.js";

const footwearBranchSchema = new Schema(
  {
    idFootwear: {
      type: String,
      required: true,
    },
    idBranch: {
      type: String,
      required: true,
    },
    priceOriginal: {
      type: Number,
      required: true,
    },
    idDiscount: {
      type: Object,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
  );

  const FootwearBranch = mongoose.model("FootwearBranch", footwearBranchSchema);
export default FootwearBranch;

  footwearBranchSchema.index({ idFootwear: 1, idBranch: 1}, { unique: true })
