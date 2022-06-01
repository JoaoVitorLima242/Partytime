import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
    name?: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserInterface>({
  name: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true }
})

export default model<UserInterface>('User', UserSchema)
