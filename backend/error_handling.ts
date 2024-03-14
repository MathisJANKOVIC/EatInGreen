import { Response } from "express"
import mongoose from "mongoose"

export function handleMongoError(error: any, res: Response) {
    if(error instanceof mongoose.Error.ValidationError) {
        const rawErrors: Array<any> = Object.entries(error.errors)
        const errors: Array<String> = rawErrors.map(([key, value]) => value.message)

        if(errors.length == 1) {
            return res.status(422).json({ error: errors[0] })
        } else {
            return res.status(422).json({ error: errors })
        }
    }
    else if(error.code == 11000) {
        return res.status(409).json({ error: 'a user with this email already exists' })
    }
    else {
        console.error(error)
        return res.status(500).json({ error: 'an error occured' })
    }
}

export function handleGenericError(error: any, res: Response) {
    console.error(error)
    return res.status(500).json({ error: 'something went wrong' })
}