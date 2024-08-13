import { dbService as database } from './main'
import { getEnv, nodeEnv } from './lib/env'
import log from './lib/log'
import app from './app'

const serverPort = Number(getEnv('SERVER_PORT'))

database.connect()
.then(() => {
    app.listen(serverPort, () => {
        if (nodeEnv.isProduction) {
            log.info('Server startup complete.')
        } else {
            log.debug('Server startup complete.') // To not overwhelm log file because of nodemon auto restarts
        }
    })
})
.catch((error) => {
    log.error(error)
    process.exit(1)
})