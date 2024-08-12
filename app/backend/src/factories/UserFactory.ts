import UserDTO from '../types/dto/internal/UserDTO'
import { generateId } from '../lib/uid'
import { hash } from '../lib/encrypt'
import User from '../entities/User'

class UserFactory {
    public static createUser(user: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        password: string
    }): User {
        return new User({
            id: generateId("User"),
            createdAt: new Date(),
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            passwordHash: hash(user.password),
            connectedAt: new Date(),
            cart: []
        })
    }

    public static createUserFromDto(userDto: UserDTO): User {
        return new User(userDto)
    }
}

export default UserFactory