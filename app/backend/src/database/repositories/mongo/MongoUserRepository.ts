import UserRepository from '../../../interfaces/repositories/UserRepository'
import MongoUser from '../../models/mongo/user/MongoUser'
import UserDocument from '../../models/mongo/user/UserDocument'
import IUser from '../../../interfaces/dto/IUser'

class MongoUserRepository implements UserRepository {
    public async create(user: IUser): Promise<void> {
        const mongoUser = this.serialize(user)
        new MongoUser(mongoUser).save()
    }

    public async findById(id: string): Promise<IUser | null> {
        const mongoUser = await MongoUser.findOne({ publicId: id }).exec()
        if (mongoUser) {
            return this.deserialize(mongoUser)
        }
        return null
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const mongoUser = await MongoUser.findOne({ email: email }).exec()
        if (mongoUser) {
            return this.deserialize(mongoUser)
        }
        return null
    }

    private serialize(user: IUser): Partial<UserDocument> {
        return { publicId: user.id, ...user }
    }

    private deserialize(mongoUser: UserDocument): IUser {
        const { publicId, ...userWithoutPublicId } = mongoUser.toObject()
        return { id: publicId, ...userWithoutPublicId }
    }
}

export default MongoUserRepository