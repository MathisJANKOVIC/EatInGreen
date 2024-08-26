import DBService from '@services/DBService'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

class MongoDBMemoryService implements DBService {
    private readonly host?: string
    private readonly port?: number
    private readonly dbName?: string
    private readonly timeoutMs: number
    private server: MongoMemoryServer | null

    constructor(config: { host?: string, port?: number, dbName?: string, timeoutMs?: number } = {}) {
        this.host = config.host
        this.port = config.port
        this.dbName = config.dbName
        this.timeoutMs = config.timeoutMs ?? 5000
        this.server = null
    }

    public async connect(): Promise<void> {
        this.server = await MongoMemoryServer.create({
            instance: { ip: this.host, port: this.port, dbName: this.dbName }
        })

        const uri = this.server.getUri()
        await mongoose.connect(uri, { serverSelectionTimeoutMS: this.timeoutMs })
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect()
        if (this.server) {
            await this.server.stop()
        }
    }
}

export default MongoDBMemoryService