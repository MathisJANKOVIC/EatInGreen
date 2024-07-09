import { Request, Response, NextFunction } from 'express'

import log from '../config/logging/appLogger'

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    log.error(`${err.message}`, { stack: err.stack })
    res.status(500).json({ error: 'Something went wrong' })
}

export default errorHandler