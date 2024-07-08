import IUser from '../dto/IUser'

interface UserRepository {
    create(user: IUser): Promise<void>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}

export default UserRepository