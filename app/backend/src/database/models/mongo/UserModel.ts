import mongoose, { Document, Schema, Model } from 'mongoose'

import UserDTO from '../../../types/dto/UserDTO'

interface UserDocument extends Omit<UserDTO, 'id'>, Document {
    publicId: string
    toDto(): UserDTO
}

interface UserModel extends Model<UserDocument> {
    fromDto(userDto: UserDTO): UserDocument
}

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

userSchema.methods.toDto = function(): UserDTO {
    const { publicId, ...userWithoutId } = this.toObject()
    return { id: publicId, ...userWithoutId }
}

userSchema.statics.fromDto = function(userDto: UserDTO): UserDocument {
    const userDoc = { publicId: userDto.id, ...userDto }
    return new this(userDoc)
}

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default UserModel
