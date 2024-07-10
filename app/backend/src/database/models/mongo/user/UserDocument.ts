import { Document } from "mongoose"

import IUser from "../../../../interfaces/dto/IUser"

interface UserDocument extends Omit<IUser, 'id'>, Document {
    publicId: string
}

export default UserDocument