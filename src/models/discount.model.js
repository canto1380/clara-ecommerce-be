import mongoose, {Schema} from 'mongoose'

const discountSchema = new Schema({
  descriptionDiscont: {
    type: String,
    required: true,
    trim: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
    trim: true,
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {timestamps: true})

const Discount = mongoose.model('Discount', discountSchema)
export default Discount


discountSchema.pre("save", async function (next) {
  const discount = this;

  // if (!user.isModified("password")) return next();

  // user.password = await bcrypt.hash(user.password, 8);
});
