import MongoUser, { IUserDocument } from '../database/models/User.model'
import IUser from '../interfaces/IUser'

interface UserRepository {
    create(user: IUser): Promise<void>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}

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

    private serialize(user: IUser): Partial<IUserDocument> {
        return { publicId: user.id, ...user }
    }

    private deserialize(mongoUser: IUserDocument): IUser {
        const { publicId, ...userWithoutPublicId } = mongoUser.toObject()
        return { id: publicId, ...userWithoutPublicId }
    }
}

export { UserRepository, MongoUserRepository }