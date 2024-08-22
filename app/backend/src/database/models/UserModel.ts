import { EntityDocument, EntityModel, entitySchema } from './entityModel'
import { UserDTO } from '../../types/dto/userDTO'
import { HASH_PATTERN_REGEX } from '../../lib/encrypt'

import { Schema, model } from 'mongoose'

const EMAIL_PATTERN_REGEX = /^\S+@\S+\.\S+$/

type UserDocument = EntityDocument<UserDTO> & Omit<UserDTO, 'id'>
type UserModel = EntityModel<UserDocument, UserDTO>

const userSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [EMAIL_PATTERN_REGEX, 'invalid email format'] },
    passwordHash: { type: String, required: true, match: [HASH_PATTERN_REGEX, 'invalid hash format'] },
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

const UserModel = model<UserDocument, UserModel>('User', userSchema)

export default UserModel
