import mongoose, { Document, Schema, Types } from 'mongoose'
import validator from 'validator'
import argon2 from 'argon2'

interface Address {
    fullName: string
    tel: string
    street: string
    city: string
    zip: string
    country: string
    additionalInfo: string
    isDefault: boolean
}

interface CartItem {
    productId: Types.ObjectId
    quantity: number
}

interface User extends Document {
    email: string
    fullName: string
    password: string
    createdAt: Date
    addresses: Address[]
    cart: CartItem[]
}

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullName field is required for an address'],
        minLength: [3, 'full name must have at least 3 characters'],
        maxLength: [32, 'full name cannot have more than 32 characters'],
        validate: {
            message: 'invalid full name',
            validator: (fullName: string) => /^[a-zA-Z\s-]+$/.test(fullName),
        }
    },
    tel: {
        type: String,
        required: [true, 'tel field is required for an address'],
        validate: [validator.isMobilePhone, 'invalid phone number']
    },
    street: {
        type: String,
        required: [true, 'street field is required for an address'],
        minLength: [5, 'street must have at least 5 characters'],
        maxLength: [64, 'street cannot have more than 64 characters'],
        validate: [validator.isAlphanumeric, 'invalid street']
    },
    city: {
        type: String,
        required: [true, 'city field is required for an address'],
        minLength: [3, 'city must have at least 3 characters'],
        maxLength: [32, 'city cannot have more than 32 characters'],
        validate: [validator.isAlpha, 'invalid city']
    },
    zip: {
        type: String,
        required: [true, 'zip field is required for an address'],
        validate: [validator.isPostalCode, 'invalid zip code']
    },
    country: {
        type: String,
        required: [true, 'country field is required for an address'],
        minLength: [3, 'country must have at least 3 characters'],
        maxLength: [32, 'country cannot have more than 32 characters'],
        validate: [validator.isAlpha, 'invalid country']
    },
    additionalInfo: {
        type: String,
        maxLength: [128, 'additional info cannot have more than 128 characters'],
        default: ""
    },
    isDefault: { type: Boolean, default: false}
});

const cartItemSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email field is required'],
        unique: true,
        immutable: true,
        lowercase: true,
        validate: [validator.isEmail, 'invalid email address']
    },
    fullName: {
        type: String,
        required: [true, 'fullName field is required'],
        minLength: [3, 'full name must have at least 3 characters'],
        maxLength: [32, 'full name cannot have more than 32 characters'],
        validate: {
            message: 'invalid full name',
            validator: (fullName: string) => /^[a-zA-Z\s-]+$/.test(fullName),
        }
    },
    password: { type: String, required: [true, 'password field is required'] },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    addresses: [addressSchema],
    cart: [cartItemSchema]
}, { versionKey: false })

userSchema.pre('save', async function(next) {
    const user = this as User

    if (user.isModified('password')) {
        user.password = await argon2.hash(user.password);
    }
    next()
});

function getUserInfo(user: User) {
    return {
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
        addresses: user.addresses.map(address => ({
            fullName: address.fullName,
            tel: address.tel,
            street: address.street,
            city: address.city,
            zip: address.zip,
            country: address.country,
            additionalInfo: address.additionalInfo,
            isDefault: address.isDefault
        })),
        cart: user.cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))
    };
}

const Users = mongoose.model<User>('User', userSchema)
export { User, Users, getUserInfo }
