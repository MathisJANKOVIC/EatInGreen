import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

class MongoDBMemoryService {
    private readonly host?: string
    private readonly port?: number
    private readonly dbName?: string
    private readonly timeoutMS: number
    private server: MongoMemoryServer | null

    constructor(options: { host?: string, port?: number, dbName?: string, timeoutMS?: number } = {}) {
        this.host = options.host
        this.port = options.port
        this.dbName = options.dbName
        this.timeoutMS = options.timeoutMS ?? 5000
        this.server = null
    }

    public async connect() {
        this.server = await MongoMemoryServer.create({
            instance: { ip: this.host, port: this.port, dbName: this.dbName },
        })

        const uri = this.server.getUri()
        await mongoose.connect(uri, { serverSelectionTimeoutMS: this.timeoutMS })
    }

    public async disconnect() {
        await mongoose.disconnect()
        if (this.server) {
            await this.server.stop()
        }
    }
}

export default MongoDBMemoryService