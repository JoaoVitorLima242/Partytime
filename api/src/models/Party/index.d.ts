import { Document, ObjectId } from 'mongoose'

export interface PartyInterface extends Document {
    title: string;
    description?: string;
    partyDate?: Date;
    photos?: [string];
    privacy?: boolean;
    userId: ObjectId;
}
