interface DBService {
    connect(): Promise<void>
    disconnect(): Promise<void>
}

export default DBService