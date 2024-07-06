import { transports, createLogger, format } from 'winston'
import * as expressWinston from 'express-winston'

const requestsLogger = expressWinston.logger({
    transports: [
        new transports.File({ filename: '../../logs/requests.log' }),
        new transports.Console()
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    expressFormat: true, // Utilise le formatage Express
    colorize: false,
})

const appLoger = expressWinston.errorLogger({
    transports: [
        new transports.File({ filename: '../../logs/app.log' }),
        new transports.Console()
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
})

export { requestsLogger, appLoger }