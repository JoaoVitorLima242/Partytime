import { Schema, model } from 'mongoose'
import { PartyInterface } from './index.d'

const PartySchema = new Schema<PartyInterface>({
  title: { type: String, required: true },
  description: { type: String },
  partyDate: { type: Date },
  photos: { type: Array },
  privacy: { type: Boolean },
  userId: { type: Schema.Types.ObjectId }
},
{
  timestamps: true
})

export default model<PartyInterface>('Party', PartySchema)
