import { TIMESTAMP_FORMAT, LOG_DIRECTORY } from './constants'

import winston, { transports, format } from 'winston'

const appLogger = winston.createLogger({
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({
            level: 'info',
            filename: `${LOG_DIRECTORY}/app.log`
        })
    ],
    format: format.combine(
        format.timestamp({ format: TIMESTAMP_FORMAT }),
        format.printf(({ level, timestamp, message, stack }) => {
            return `${timestamp} - ${level.toUpperCase()} - ${stack || message}`
        })
    )
})

export default appLogger