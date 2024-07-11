import { Document } from "mongoose"

import UserDTO from "../../../../interfaces/dto/UserDTO"

interface UserDocument extends Omit<UserDTO, 'id'>, Document {
    publicId: string
}

export default UserDocument