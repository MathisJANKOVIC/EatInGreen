import { UserDTO } from '../types/dto/userDTO'
import { createEntityId } from '../lib/uid'
import { hash } from '../lib/encrypt'
import User from '../entities/User'

class UserFactory {
    public static createUser(userData: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        password: string
    }): User {
        return new User({
            id: createEntityId('User'),
            createdAt: new Date(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            passwordHash: hash(userData.password),
            connectedAt: new Date(),
            cart: []
        })
    }

    public static createUserFromDto(userDto: UserDTO): User {
        return new User(userDto)
    }
}

export default UserFactory