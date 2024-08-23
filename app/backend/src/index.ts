import 'module-alias/register'
import { dbService } from './main'
import { getEnv, nodeEnv } from '@lib/env'
import log from '@lib/log'
import app from './app'

const serverPort = getEnv('SERVER_PORT');

(async () => {
    await dbService.connect()

    app.listen(serverPort, () => {
        if (nodeEnv.isProduction) {
            log.info('Server startup complete.')
        } else {
            log.debug('Server startup complete.') // To not overwhelm log file because of nodemon auto restarts
        }
    })

})()