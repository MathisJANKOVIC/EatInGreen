import UserDTO from '../dto/UserDTO'

interface UserRepository {
    create(user: UserDTO): Promise<void>
    findById(id: string): Promise<UserDTO | null>
    findByEmail(email: string): Promise<UserDTO | null>
}

export default UserRepository