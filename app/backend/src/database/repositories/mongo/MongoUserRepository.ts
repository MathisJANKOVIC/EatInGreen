import UserRepository from '../../../interfaces/repositories/UserRepository'
import UserDTO from '../../../types/dto/UserDTO'
import UserModel from '../../models/mongo/UserModel'

class MongoUserRepository implements UserRepository {
    public async create(userDto: UserDTO): Promise<void> {
        const userDoc = UserModel.fromDto(userDto)
        userDoc.save()
    }

    public async findById(id: string): Promise<UserDTO | null> {
        const userDoc = await UserModel.findOne({ publicId: id }).exec()
        if (userDoc) {
            return userDoc.toDto()
        }
        return null
    }

    public async findByEmail(email: string): Promise<UserDTO | null> {
        const userDoc = await UserModel.findOne({ email }).exec()
        if (userDoc) {
            return userDoc.toDto()
        }
        return null
    }
}

export default MongoUserRepository