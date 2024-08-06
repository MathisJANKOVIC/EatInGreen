import { MongoMemoryServer } from 'mongodb-memory-server'
import { ExpressClient } from './expressClient'
import app from '../src/app'
 
import mongoose from 'mongoose'

let client: ExpressClient

beforeAll(async () => {
    const mongoMemoryServer = await MongoMemoryServer.create()

    const mongoMemoryUri = mongoMemoryServer.getUri()
    mongoose.connect(mongoMemoryUri)

    client = new ExpressClient(app)
})


export { client }