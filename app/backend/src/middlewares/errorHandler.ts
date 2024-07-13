import { Request, Response, NextFunction } from 'express'

import log from '../lib/log'
import HTTPError from '../lib/HTTPError'

function errorHandler(error: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HTTPError) {
        res.status(error.statusCode).json({ error: error.message })
    } else {
        log.error(error.message, { stack: error.stack })
        res.status(500).json({ error: 'Something went wrong' })
    }
}

export default errorHandler