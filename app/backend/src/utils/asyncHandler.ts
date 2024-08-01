import { Request, Response, NextFunction } from 'express'

/**
 * Wraps an async express controller to properly handle async errors.
 * @param func The async controller function to wrap.
 * @returns The same controller function that handles async errors.
 */
function asyncHandler(func: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return function(req: Request, res: Response, next: NextFunction) {
        Promise.resolve(func(req, res, next)).catch(next)
    }
}

export default asyncHandler