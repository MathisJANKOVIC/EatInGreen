import { NodeEnv } from './lib/env'
import * as env from './lib/env'
import { dbService } from './services'
import log from './lib/log'
import app from './app'

const serverPort = env.get('SERVER_PORT')
const environment = env.get('NODE_ENV')

dbService.connect(5000)

app.listen(serverPort, () => {
    if (environment === NodeEnv.PROD) {
        log.info('Server startup complete.')
    } else {
        log.debug('Server startup complete.') // To not overwhelm log file because of nodemon auto restarts
    }
})
