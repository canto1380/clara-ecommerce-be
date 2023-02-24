import mongoose, { Schema } from "mongoose";

const datasheetSchema = new Schema(
  {
    idFootwear: {
      type: Schema.Types.ObjectId,
      ref: 'Footwear'
    },
    material: {
      type: String
    },
    suela: {
      type: String
    },
    color: {
      type: String,
    },
    taco: {
      type: String,
    },
    acceso: {
      type: String,
    },
    plataforma: {
      type: String,
    },
    interior: {
      type: String
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const DataSheet = mongoose.model("DataSheet", datasheetSchema);
export default DataSheet;
