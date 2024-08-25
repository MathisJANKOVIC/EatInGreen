import UserRepository from '@repositories/UserRepository'
import User from '@entities/User'
import { UserDTO } from '@types-dto/userDTO'

class UserService {
    private readonly userRepository: UserRepository

    constructor(repository: UserRepository) {
        this.userRepository = repository
    }

    public async getUserById(id: string): Promise<User | null> {
        const userDto = await this.userRepository.findById(id)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const userDto = await this.userRepository.findByEmail(email)
        if (userDto) {
            return new User(userDto)
        }
        return null
    }

    public async saveUser(user: User): Promise<void> {
        await this.userRepository.save(user.toDto())
    }

    public async update(user: User): Promise<void> {
        const userDto = user.toDto()
        await this.userRepository.update(userDto)
        
       
    }
    
    
    
    public async deleteFromCart(id: string, productId: string): Promise<void> {
        const userDto = await this.userRepository.findById(id)
        if (userDto) {
            await this.userRepository.save(userDto)
        }
    }

    public async getCart(userId: string): Promise<{ productId: string, quantity: number }[]> {
        // Retourner le panier de l'utilisateur, ou un tableau vide s'il n'a pas de panier
        const userDto = await this.userRepository.findById(userId)
        if (userDto) {
            return userDto.cart
        }
        return []
    }
}

export default UserService