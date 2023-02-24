import mongoose, {Schema} from 'mongoose'
import Branch from './branch.model.js'
import FootwearBranch from './productBranch.model.js'
import { returnBranch } from '../controllers/branch.controller.js'

const footwearSchema = new Schema({
  nameFootwear: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: [10, 'Description must be greater than 10 char'],
    maxlength: [100, 'Description must be less than 100 char'],
  },
  idFootwearType: {
    type: Schema.Types.ObjectId,
    ref: 'FootwearType',
    required: true
  },
  photos: {
    type: [String],
  },
  size: {
    type: [Number],
  },
  countInStock: {
    type: Number,
    trim: true,
    required: true,
    default: 0
  },
  itemCode: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: [10, 'itemCode must be greater than 10 char'],
    maxlength: [15, 'itemCode must be less than 15 char'],
  },
  new: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    desfult: false
  },
  priceOriginal: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    default: 0
  },
  totalWithDiscount: {
    type: Number,
    default: 0,
  },
  idDiscount: {
    type: Schema.Types.ObjectId,
    ref: 'Discount'
  },
  stock: {
    type: Number,
    required: true
  },
  idColor: {
    type: [Schema.Types.ObjectId],
    ref:'Color'
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

// footwearSchema.post('save', async function(footwear) {
//   const branchId = await returnBranch()
//   const footwearBranch = await FootwearBranch.findOne({idFootwear: footwear.id, idBranch: branchId._id})
//   if(footwearBranch) {
//     return null
//   } else {
//     await FootwearBranch.create({
//       idFootwear:footwear._id,
//       idBranch: branchId._id,
//       priceOriginal: footwear.priceOriginal,
//       stock: footwear.stock,
//       idDiscount: footwear.idDiscount
//     })
//   }

// })

// footwearSchema.methods.saveFootwearBranch = async function(footwear) {
//   const branchId = await returnBranch()
//   await FootwearBranch.create({
//     idFootwear:footwear._id,
//     idBranch: branchId._id,
//     priceOriginal: footwear.priceOriginal,
//     stock: footwear.stock,
//     idDiscount: footwear.idDiscount
//   })
// }

const Footwear = mongoose.model('Footwear', footwearSchema)
export default Footwear;

