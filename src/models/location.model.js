import mongoose, {Schema} from "mongoose";

const locationSchema = new Schema({
  nameLocation: {
    type: String,
    trime: true,
    required: [true, 'Location is required']
  },
  idProvince: {
    type: Schema.Types.ObjectId,
    ref: 'Province'
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Location = mongoose.model("Location", locationSchema)

export default Location
