import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
    name?: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserInterface>({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export default model<UserInterface>('User', UserSchema)
