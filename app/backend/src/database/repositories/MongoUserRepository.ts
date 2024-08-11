import UserRepository from '../../interfaces/repositories/UserRepository'
import UserDTO from '../../interfaces/dto/internal/UserDTO'
import UserModel from '../models/UserModel'

class MongoUserRepository implements UserRepository {
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

    public async save(userDto: UserDTO): Promise<void> {
        const userDoc = UserModel.fromDto(userDto)
        await userDoc.save()
    }
}

export default MongoUserRepository