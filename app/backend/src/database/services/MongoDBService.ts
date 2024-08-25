import DBService from '@services/DBService'

import mongoose from 'mongoose'

class MongoDBService implements DBService {
    private readonly host: string
    private readonly port: number
    private readonly user: string
    private readonly password: string
    private readonly dbName: string
    private readonly timeoutMs: number

    constructor(config: {
        host: string,
        port: number,
        user: string,
        password: string,
        dbName: string,
        timeoutMs?: number
    }) {
        this.host = config.host
        this.port = config.port
        this.user = config.user
        this.password = config.password
        this.dbName = config.dbName
        this.timeoutMs = config.timeoutMs ?? 5000
    }

    public async connect(): Promise<void> {
        await mongoose.connect(
            `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
                serverSelectionTimeoutMS: this.timeoutMs
            }
        )
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect()
    }
}

export default MongoDBService