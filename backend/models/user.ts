import mongoose, { Document } from 'mongoose'

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [{
        fullName: { type: String, required: true},
        tel: { type: String, required: true },
        additionalInfo: { type: String, default: ""},
        street: { type: String, required: true},
        city: { type: String, required: true},
        zip: { type: String, required: true},
        country: { type: String, required: true},
        isDefault: { type: Boolean, required: true}
    }]
}, { versionKey: false })

interface User extends Document {
    fullName: string
    email: string
    password: string
    addresses: Array<{
        fullName: string
        tel: string
        additionalInfo: string
        street: string
        city: string
        zip: string
        country: string
        isDefault: boolean
    }>
}

function getUserInfo(user: User) {
    return {
        email: user.email,
        fullName: user.fullName,
        addresses: user.addresses.map(address => ({
            fullName: address.fullName,
            tel: address.tel,
            additionalInfo: address.additionalInfo,
            street: address.street,
            city: address.city,
            zip: address.zip,
            country: address.country,
            isDefault: address.isDefault
        }))
    }
}

const Users = mongoose.model('User', Schema)
export { User, Users, getUserInfo }
