import UserRepository from '@repositories/UserRepository'
import { UserDTO } from '@types-dto/userDTO'
import UserModel from '../models/UserModel'

class MongoUserRepository implements UserRepository {
    public async findById(id: string): Promise<UserDTO | null> {
        const userDocument = await UserModel.findOne({ publicId: id }).exec()
        if (userDocument) {
            return userDocument.toDto()
        }
        return null
    }

    public async findByEmail(email: string): Promise<UserDTO | null> {
        const userDocument = await UserModel.findOne({ email }).exec()
        if (userDocument) {
            return userDocument.toDto()
        }
        return null
    }

    public async save(userDto: UserDTO): Promise<void> {
        const userDocument = UserModel.fromDto(userDto)
        await userDocument.save()
    }

    public async update(userDTO: UserDTO): Promise< void > {

        await UserModel.findOneAndUpdate(
            { publicId: userDTO.id },  // Utilisation de publicId pour trouver l'utilisateur
            { $set: userDTO },         // Mise à jour des champs fournis avec $set
            { new: true }                   // Retourner le document mis à jour
        ).exec()

    }                                                                    
    

    public async deleteFromCart(userId: string, productId: string): Promise<void> {
        const userDocument = await UserModel.findOne({ publicId: userId }).exec()
        if (userDocument) {
            userDocument.cart = userDocument.cart.filter(item => item.productId !== productId)
            await userDocument.save()
        } 
    }
}

export default MongoUserRepository