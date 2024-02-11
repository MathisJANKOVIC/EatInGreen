import express from 'express'
import auth from './routes/auth/register'

const port = process.env.SERVER_PORT
const app = express()

app.use('', auth)

app.listen(port, () => {
    console.log('Server is running successfully')
})
