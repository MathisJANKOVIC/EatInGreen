import EntityRepository from './EntityRepository'
import { UserDTO } from '../types/dto/userDTO'

interface UserRepository extends EntityRepository<UserDTO> {
    findByEmail(email: string): Promise<UserDTO | null>
}

export default UserRepository