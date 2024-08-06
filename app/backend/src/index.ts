import { dbService as database } from './main'
import { getEnv, NodeEnv } from './lib/env'
import log from './lib/log'
import app from './app'

const serverPort = getEnv('SERVER_PORT')
const environment = getEnv('NODE_ENV')

database.connect(5000)
.then(() => {
    app.listen(parseInt(serverPort) ,'0.0.0.0', () => {
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