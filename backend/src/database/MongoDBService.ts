import mongoose from 'mongoose'

import DBService from './DBService'

class MongoDBService extends DBService {
    private readonly requestsTimeoutMS: number

    constructor(host: string, port: string, user: string, password: string, dbName: string, requestsTimeoutMS: number) {
        super(host, port, user, password, dbName)
        this.requestsTimeoutMS = requestsTimeoutMS
    }

    public async connect(timeoutMS: number) {
        await mongoose.connect(
            `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
                serverSelectionTimeoutMS: timeoutMS,
                connectTimeoutMS: this.requestsTimeoutMS,
            }
        )
    }
}

export default MongoDBService