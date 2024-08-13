import { ExpressClient } from './utils/expressClient'
import { dbService } from '../src/main'
import app from '../src/app'

let client: ExpressClient

beforeAll(async () => {
    await dbService.connect()
    client = new ExpressClient(app)
})

afterAll(async () => {
    await dbService.disconnect()
})


export { client }