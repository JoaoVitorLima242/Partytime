import { Schema, model, Document, ObjectId } from 'mongoose'

interface PartyInterface extends Document {
    title: string;
    description?: string;
    partyDate?: Date;
    photos?: [string];
    privacy?: boolean;
    userId: ObjectId;
}
