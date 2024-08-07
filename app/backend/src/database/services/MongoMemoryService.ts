import DBService from "../../services/DBService"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

class MongoMemoryService extends DBService {
    private mongoMemoryServer: MongoMemoryServer | undefined;

    constructor(host: string, port: number, user: string, password: string, dbName: string, requestsTimeoutMS: number) {
        super(host, port, user, password, dbName)
    }

    public override async connect(timeoutMS: number): Promise<void> {
        this.mongoMemoryServer = await MongoMemoryServer.create({
            instance: {
                dbName: this.dbName,
                port: this.port,
                ip: this.host
            }
        })
        const mongoMemoryUri = this.mongoMemoryServer.getUri()
        mongoose.connect(mongoMemoryUri)
        // Utiliser mongoMemoryUri pour se connecter à la base de données
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect()
        await mongoose.connection.close()
    }
}

export default MongoMemoryService