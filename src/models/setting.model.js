import mongoose, {Schema} from 'mongoose'

const settingSchema = new Schema({
  settings: {
    type: Object
  }
}, {timestamps: true})

const Settings = mongoose.model('Setting', settingSchema)
export default Settings
