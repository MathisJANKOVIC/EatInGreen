import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import { db } from './settings'
import login from './routes/auth/login'
import register from './routes/auth/register'
import updateUser from './routes/user/update'
import getProducts from './routes/product/get_all'
import getUserDetails from './routes/user/get_details'
import populateProducts from './routes/product/populate'
import searchProducts from './routes/product/search'
import addProductToCart from './routes/user/cart/add_product'
import rmProductFromCart from './routes/user/cart/delete_product'
import getProduct from './routes/product/getproduct'
import { MongoDBService } from './database'

const serverPort: string = process.env.SERVER_PORT || '3000'
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string = process.env.DB_PORT || '27017'
const dbPassword: string = process.env.DB_PASSWORD || 'pass'
const dbUser: string  = process.env.DB_USER || 'root'
const dbName: string = process.env.DB_NAME || 'shopingreen'

const database = new MongoDBService(dbHost, dbPort, dbUser, dbPassword, dbName, db.connectionTimeoutSEC)

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/login', login)
app.use('/register', register)

app.use('/user', getUserDetails)
app.use('/user/update', updateUser)
app.use('/user/add-to-cart/:productId', addProductToCart)
app.use('/user/remove-from-cart/', rmProductFromCart)

app.use('/product/search', searchProducts)
app.use('/product', getProduct)
app.use('/product', getProducts)
app.use('/product/populate', populateProducts)

let isConnected = false
let isConnecting = false

async function connectToDbAndRetryIfFails() {
    if(isConnecting) {
        return
    }
    isConnecting = true

    while(true) {
        try {
            database.connect(2000)
            break
        } catch (error) {
            // console.error(error)
            console.log(`[express] failed to connect to MongoDB, retrying in ${db.reconnectionDelaySEC} sec`)
            await new Promise(resolve => setTimeout(resolve, db.reconnectionDelaySEC * 1000))
        }
    }
    isConnected = true
    isConnecting = false

    console.log('[express] successfully connected to MongoDB')
}
(async () => {
    await connectToDbAndRetryIfFails()
})()

mongoose.connection.on('disconnected', () => {
    if(isConnected) {
        isConnected = false
        console.log('[express] disconnected from MongoDB, reconnecting...')
    }
    connectToDbAndRetryIfFails()
})

app.listen(serverPort, () => {
    console.log('[express] server is up and running')
})
