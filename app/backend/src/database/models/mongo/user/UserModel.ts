import { model, Schema } from 'mongoose'

import UserDocument from './UserDocument'

const userSchema = new Schema<UserDocument>({
    publicId: { type: String, required: true, unique: true, immutable: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true, immutable: true}
},
{ versionKey: false }
)

const UserModel = model<UserDocument>('User', userSchema)

export default UserModel
