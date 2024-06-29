import mongoose from 'mongoose'

abstract class DBService {
    protected readonly host: string
    protected readonly port: string
    protected readonly user: string
    protected readonly password: string
    protected readonly dbName: string

    constructor(host: string, port: string, user: string, password: string, dbName: string) {
        this.host = host
        this.port = port
        this.user = user
        this.password = password
        this.dbName = dbName
    }

    abstract connect(timeoutMS: number): Promise<void>
}

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

export { DBService, MongoDBService }
