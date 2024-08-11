import EntityRepository from './EntityRepository'
import UserDTO from '../dto/internal/UserDTO'

interface UserRepository extends EntityRepository<UserDTO> {
    findByEmail(email: string): Promise<UserDTO | null>
}

export default UserRepository