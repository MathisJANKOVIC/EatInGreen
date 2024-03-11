import mongoose, { Document } from 'mongoose'

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [{
        fullName: { type: String, required: true},
        tel: { type: String, required: true },
        AdditionalInfo: { type: String, default: ""},
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
    addresses: {
        fullName: string
        tel: string
        AdditionalInfo: string
        street: string
        city: string
        zip: string
        country: string
        isDefault: boolean
    }[]
}

function safeFields(user: User) {
    return {
        email: user.email,
        fullName: user.fullName,
    }
}

const Users = mongoose.model('User', Schema)
export { User, Users, safeFields }
