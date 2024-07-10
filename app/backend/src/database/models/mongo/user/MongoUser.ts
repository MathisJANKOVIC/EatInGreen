import { model } from 'mongoose'

import userSchema from './userSchema'
import UserDocument from './UserDocument'

const MongoUser = model<UserDocument>('User', userSchema)

export default MongoUser
