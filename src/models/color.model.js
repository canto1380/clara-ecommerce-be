import mongoose, {Schema} from 'mongoose'

const colorFootwearSchema = new Schema({
  colorName: {
    type: String,
    trim: true,
    required: true
  },
  colorCode: {
    type: String,
    trim: true,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})
const ColorFootwear = mongoose.model('Color', colorFootwearSchema)
export default ColorFootwear;
