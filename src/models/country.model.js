import mongoose, {Schema} from 'mongoose'

const countrySchema = new Schema({
  nameCountry: {
    type: String,
    trim: true,
    required: [true, 'Country is required']
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Country = mongoose.model('Country', countrySchema)
export default Country
