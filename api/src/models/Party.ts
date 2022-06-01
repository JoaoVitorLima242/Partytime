import { Schema, model, Document, ObjectId } from 'mongoose'

interface PartyInterface extends Document {
    title: string;
    description?: string;
    partyDate?: Date;
    photos?: [string];
    privacy?: boolean;
    userId: ObjectId;
}

const PartySchema = new Schema<PartyInterface>({
  title: { type: String, required: true },
  description: { type: String },
  partyDate: { type: Date },
  photos: { type: Array },
  privacy: { type: Boolean },
  userId: { type: Schema.Types.ObjectId }
})

export default model<PartyInterface>('Party', PartySchema)
