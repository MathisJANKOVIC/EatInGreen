import UserRepository from '../../../interfaces/repositories/UserRepository'
import UserDocument from '../../models/mongo/user/UserDocument'
import UserModel from '../../models/mongo/user/UserModel'
import UserDTO from '../../../interfaces/dto/UserDTO'

class MongoUserRepository implements UserRepository {
    public async create(userDto: UserDTO): Promise<void> {
        const userDoc = this.toDocument(userDto)
        new UserModel(userDoc).save()
    }

    public async findById(id: string): Promise<UserDTO | null> {
        const userDoc = await UserModel.findOne({ publicId: id }).exec()
        if (userDoc) {
            return this.toDto(userDoc)
        }
        return null
    }

    public async findByEmail(email: string): Promise<UserDTO | null> {
        const userDoc = await UserModel.findOne({ email: email }).exec()
        if (userDoc) {
            return this.toDto(userDoc)
        }
        return null
    }

    private toDocument(userDto: UserDTO): Partial<UserDocument> {
        return { publicId: userDto.id, ...userDto }
    }

    private toDto(userDoc: UserDocument): UserDTO {
        const { publicId, ...userWithoutId } = userDoc.toObject()
        return { id: publicId, ...userWithoutId }
    }
}

export default MongoUserRepository