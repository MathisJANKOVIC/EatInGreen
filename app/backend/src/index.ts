import { dbService as database } from './main'
import { getEnv, NodeEnv } from './lib/env'
import log from './lib/log'
import app from './app'

const serverPort = Number(getEnv('SERVER_PORT'))
const environment = getEnv('NODE_ENV')
// database.connect()
database.disconnect()

database.connect()
.then(() => {
    app.listen(serverPort, () => {
        if (environment === NodeEnv.PRODUCTION) {
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