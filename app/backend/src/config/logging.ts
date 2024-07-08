import expressWinston from 'express-winston'
import { transports, format } from 'winston'
import path from 'path'

const consoleLogFormatter = ({ level, timestamp, meta }: any) => {
    const { ip, port } = meta.extra
    const { method, url, httpVersion } = meta.req
    const statusCode = meta.res.statusCode
    return `${level.toUpperCase()} - ${timestamp} - ${ip}:${port} - "${method} ${url} HTTP/${httpVersion}" ${statusCode}`
}

const fileLogFormatter = ({ timestamp, meta }: any) => {
    const { ip, port } = meta.extra
    const { method, url, httpVersion } = meta.req
    const statusCode = meta.res.statusCode
    return `${timestamp} - ${ip}:${port} - "${method} ${url} HTTP/${httpVersion}" ${statusCode}`
}

const httpRequestsLogger = expressWinston.logger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.json(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
                format.printf(consoleLogFormatter)
            )
        }),
        new transports.File({
            filename: path.join(__dirname, '../../logs/requests.log'),
            format: format.combine(
                format.json(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
                format.printf(fileLogFormatter)
            )
        })
    ],
    dynamicMeta: (req, res) => {
        let ip = req.socket.remoteAddress as string
        const port = req.socket.remotePort

        if (ip.startsWith('::ffff:')) {
            ip = ip.substring(7)
        }
        return { extra: { ip, port } }
    },
})

export { httpRequestsLogger }