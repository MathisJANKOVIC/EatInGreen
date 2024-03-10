import mongoose, { Document } from 'mongoose'

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
}, { versionKey: false })

interface User extends Document {
    fullName: string
    email: string
    password: string
}

const Users = mongoose.model('User', Schema)
export { User, Users }
