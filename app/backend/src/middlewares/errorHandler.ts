import { Request, Response, NextFunction } from 'express'

import log from '../lib/log'

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    log.error(`${err.message}`, { stack: err.stack })
    res.status(500).json({ error: 'Something went wrong' })
}

export default errorHandler