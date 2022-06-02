import { Schema, model } from 'mongoose'
import { UserInterface } from './index.d'

const UserSchema = new Schema<UserInterface>({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export default model<UserInterface>('User', UserSchema)
