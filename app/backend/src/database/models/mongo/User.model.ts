import { Document, Schema, model } from 'mongoose'

import IUser from '../../../interfaces/dto/IUser'

export interface IUserDocument extends Omit<IUser, 'id'>, Document {
    publicId: string
}

const userSchema = new Schema<IUserDocument>({
    publicId: { type: String, required: true, unique: true, immutable: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true, immutable: true}
},
{ versionKey: false }
)

const User = model<IUserDocument>('User', userSchema)

export default User