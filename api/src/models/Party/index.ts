import { Schema, model } from 'mongoose'
import { PartyInterface } from './index.d'

const PartySchema = new Schema<PartyInterface>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  partyDate: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  photos: { type: Array },
  privacy: { type: Boolean }
},
{
  timestamps: true
})

export default model<PartyInterface>('Party', PartySchema)
