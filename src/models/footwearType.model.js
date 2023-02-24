import mongoose, {Schema} from 'mongoose'

const footwearTypeSchema = new Schema({
  nameType: {
    type: String,
    trim: true,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  }
}, {timestamps: true})

const FootwearType =  mongoose.model('FootwearType', footwearTypeSchema)
export default FootwearType
