import { dbService as database } from './services'
import { NodeEnv } from './lib/env'
import * as env from './lib/env'
import log from './lib/log'
import app from './app'

const serverPort = env.get('SERVER_PORT')
const environment = env.get('NODE_ENV')

database.connect(5000)
.then(() => {
    app.listen(serverPort, () => {
        if (environment === NodeEnv.PROD) {
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