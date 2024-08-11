type DBServiceOptions = {
    host: string
    port: number
    user: string
    password: string
    dbName: string
    timeoutMS?: number
}

abstract class DBService {
    protected readonly host: string
    protected readonly port: number
    protected readonly user: string
    protected readonly password: string
    protected readonly dbName: string
    protected readonly timeoutMS: number

    constructor({ host, port, user, password, dbName, timeoutMS = 5000 }: DBServiceOptions) {
        this.host = host
        this.port = port
        this.user = user
        this.password = password
        this.dbName = dbName
        this.timeoutMS = timeoutMS
    }

    abstract connect(): Promise<void>
    abstract disconnect(): Promise<void>
}

export { DBService, DBServiceOptions }