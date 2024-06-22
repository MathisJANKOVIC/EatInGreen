import mongoose from 'mongoose'

interface DBService {
    connect(connectionTimeoutSEC: number): void
}

export class MongoDBService implements DBService {
    private host: string
    private port: string
    private user: string
    private password: string
    private dbName: string
    private serverSelectionTimeoutSEC: number

    constructor(host: string, port: string, user: string, password: string, dbName: string, serverSelectionTimeoutSEC: number) {
        this.host = host
        this.port = port
        this.user = user
        this.password = password
        this.dbName = dbName
        this.serverSelectionTimeoutSEC = serverSelectionTimeoutSEC
    }

    connect(connectionTimeoutSEC: number): void {
        mongoose.connect(`mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}?authSource=admin`, {
            serverSelectionTimeoutMS: this.serverSelectionTimeoutSEC * 1000,
            connectTimeoutMS: connectionTimeoutSEC * 1000,
        })
    }
}
