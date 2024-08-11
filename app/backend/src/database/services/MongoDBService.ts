import { DBService, DBServiceOptions } from '../../services/dbService'

import mongoose from 'mongoose'

class MongoDBService extends DBService {
    constructor(dbServiceOptions: DBServiceOptions) {
        super(dbServiceOptions)
    }

    public override async connect() {
        await mongoose.connect(
            `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
                serverSelectionTimeoutMS: this.timeoutMS,
            }
        )
    }

    public override async disconnect() {
        await mongoose.disconnect()
    }
}

export default MongoDBService