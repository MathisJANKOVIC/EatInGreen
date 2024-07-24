import DBService from './DBService'

import mongoose from 'mongoose'

class MongoDBService extends DBService {
    private readonly requestsTimeoutMS: number

    constructor(host: string, port: number, user: string, password: string, dbName: string, requestsTimeoutMS: number) {
        super(host, port, user, password, dbName)
        this.requestsTimeoutMS = requestsTimeoutMS
    }

    public async connect(timeoutMS: number): Promise<void> {
        try {
            await mongoose.connect(
                `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
                    serverSelectionTimeoutMS: timeoutMS,
                    connectTimeoutMS: this.requestsTimeoutMS,
                }
            )
        } catch (error) {
            throw new Error(
                `Failed to connect to MongoDB \n${error}`
            )
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect()
    }
}

export default MongoDBService