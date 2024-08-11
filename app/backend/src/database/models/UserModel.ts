import { EntityDocument, EntityModel, entitySchema } from "./baseEntityModel"
import UserDTO from '../../interfaces/dto/internal/UserDTO'
import { HASH_REGEX } from '../../lib/encrypt'

import mongoose, { Schema } from 'mongoose'

const BASIC_EMAIL_REGEX = /^\S+@\S+\.\S+$/

type UserDocument = EntityDocument<UserDTO> & Omit<UserDTO, 'id'>
type UserModel = EntityModel<UserDocument, UserDTO>

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [BASIC_EMAIL_REGEX, 'invalid email format'] },
    passwordHash: { type: String, required: true, match: [HASH_REGEX, 'invalid hash format'] },
    connectedAt: { type: Date, required: true },
    cart: {
        type: [{
            productId: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }],
        required: true,
    }
})
userSchema.add(entitySchema)

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default UserModel
