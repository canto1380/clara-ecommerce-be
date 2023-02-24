import mongoose, {Schema} from 'mongoose'

const branchSchema = new Schema ({
  nameBranch: {
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
  idAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Branch = mongoose.model("Branch", branchSchema)
export default Branch
