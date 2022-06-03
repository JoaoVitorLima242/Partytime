import { Schema, model } from 'mongoose'
import { UserInterface } from './index.d'

const UserSchema = new Schema<UserInterface>({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
},
{
  timestamps: true
})

export default model<UserInterface>('User', UserSchema)
