import { transports, format } from 'winston'
import { TransformableInfo } from 'logform'
import expressWinston from 'express-winston'
import { Request, Response } from 'express'

import { TIMESTAMP_FORMAT, LOG_DIRECTORY } from './constants'
 
class HTTPRequestLogFormatter {
    public static console = ({ level, timestamp, meta }: TransformableInfo) => {
        const { ip, port } = meta.extra
        const { method, url, httpVersion } = meta.req
        const statusCode = meta.res.statusCode
        return `${timestamp} - ${level.toUpperCase()} - ${ip}:${port} - "${method} ${url} HTTP/${httpVersion}" ${statusCode}`
    }

    public static file = ({ timestamp, meta }: TransformableInfo) => {
        const { ip, port } = meta.extra
        const { method, url, httpVersion } = meta.req
        const statusCode = meta.res.statusCode
        return `${timestamp} - ${ip}:${port} - "${method} ${url} HTTP/${httpVersion}" ${statusCode}`
    }
}

const httpRequestLogger = expressWinston.logger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.json(),
                format.timestamp({ format: TIMESTAMP_FORMAT }),
                format.printf(HTTPRequestLogFormatter.console)
            )
        }),
        new transports.File({
            level: 'info',
            filename: `${LOG_DIRECTORY}/http-requests.log`,
            format: format.combine(
                format.json(),
                format.timestamp({ format: TIMESTAMP_FORMAT }),
                format.printf(HTTPRequestLogFormatter.file)
            )
        })
    ],
    dynamicMeta: (req: Request, res: Response) => {
        let ip = req.socket.remoteAddress as string
        const port = req.socket.remotePort

        if (ip.startsWith('::ffff:')) {
            ip = ip.substring(7)
        }
        return { extra: { ip, port } }
    },
})

export default httpRequestLogger