import mongoose, {Schema} from "mongoose";

const provinceSchema = new Schema({
  nameProvince: {
    type: String,
    trime: true,
    required: [true, 'Province is required']
  },
  idCountry: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Province = mongoose.model("Province", provinceSchema)

export default Province
