abstract class DBService {
    protected readonly host: string
    protected readonly port: number
    protected readonly user: string
    protected readonly password: string
    protected readonly dbName: string
    protected readonly timeoutMS: number

    constructor(config: {
        host: string,
        port: number,
        user: string,
        password: string,
        dbName: string,
        timeoutMS?: number
    }) {
        this.host = config.host
        this.port = config.port
        this.user = config.user
        this.password = config.password
        this.dbName = config.dbName
        this.timeoutMS = config.timeoutMS ?? 5000
    }

    public abstract connect(): Promise<void>
    public abstract disconnect(): Promise<void>
}

export default DBService