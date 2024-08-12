import UserRepository from '../../repositories/UserRepository'
import UserDTO from '../../types/dto/internal/UserDTO'
import UserModel from '../models/UserModel'

class MongoUserRepository implements UserRepository {
    public async findById(id: string) {
        const userDocument = await UserModel.findOne({ publicId: id }).exec()
        if (userDocument) {
            return userDocument.toDto()
        }
        return null
    }

    public async findByEmail(email: string) {
        const userDocument = await UserModel.findOne({ email }).exec()
        if (userDocument) {
            return userDocument.toDto()
        }
        return null
    }

    public async save(userDto: UserDTO) {
        const userDocument = UserModel.fromDto(userDto)
        await userDocument.save()
    }
}

export default MongoUserRepository