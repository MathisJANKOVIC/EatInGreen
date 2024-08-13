import DBService from '../../services/DBService'

import mongoose from 'mongoose'

class MongoDBService extends DBService {
    constructor(config: {
        host: string,
        port: number,
        user: string,
        password: string,
        dbName: string,
        timeoutMS?: number
    }) {
        super(config)
    }

    public async connect() {
        await mongoose.connect(
            `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
                serverSelectionTimeoutMS: this.timeoutMS,
            }
        )
    }

    public async disconnect() {
        await mongoose.disconnect()
    }
}

export default MongoDBService