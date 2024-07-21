import { Request, Response, NextFunction } from 'express'

/** Wraps an async controller function to properly handle errors.*/
function asyncHandler(func: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return function(req: Request, res: Response, next: NextFunction) {
        Promise.resolve(func(req, res, next)).catch(next)
    }
}

export default asyncHandler