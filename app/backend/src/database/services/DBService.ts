abstract class DBService {
    protected readonly host: string
    protected readonly port: number
    protected readonly user: string
    protected readonly password: string
    protected readonly dbName: string
;
    constructor(host: string, port: number, user: string, password: string, dbName: string) {
        this.host = host
        this.port = port
        this.user = user
        this.password = password
        this.dbName = dbName
    }

    abstract connect(timeoutMS: number): Promise<void>
}

export default DBService