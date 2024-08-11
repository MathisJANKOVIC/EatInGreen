import UserRepository from '../../repositories/UserRepository'
import UserDTO from '../../types/dto/internal/UserDTO'
import UserModel from '../models/UserModel'

class MongoUserRepository implements UserRepository {
    public async findById(id: string) {
        const userDoc = await UserModel.findOne({ publicId: id }).exec()
        if (userDoc) {
            return userDoc.toDto()
        }
        return null
    }

    public async findByEmail(email: string) {
        const userDoc = await UserModel.findOne({ email }).exec()
        if (userDoc) {
            return userDoc.toDto()
        }
        return null
    }

    public async save(userDto: UserDTO) {
        const userDoc = UserModel.fromDto(userDto)
        await userDoc.save()
    }
}

export default MongoUserRepository