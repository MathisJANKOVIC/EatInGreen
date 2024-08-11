import UserDTO from '../types/dto/internal/UserDTO'
import { generateId } from '../lib/uid'
import { hash } from '../lib/encrypt'
import User from '../entities/User'

class UserFactory {
    public static createUser(firstName: string, lastName: string, phoneNumber: string, email: string, password: string): User {
        const userDto: UserDTO = {
            id: generateId("User"),
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            passwordHash: hash(password),
            createdAt: new Date(),
            connectedAt: new Date(),
            cart: []
        }
        return new User(userDto)
    }

    public static constructUserFromDto(userDto: UserDTO): User {
        return new User(userDto)
    }
}

export default UserFactory