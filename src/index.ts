import connectDB from './utils/connectDB'
import logger from './utils/logger'
import config from 'config'
import createServer from "./utils/server";

const port = config.get<number>('port')

const app = createServer()

app.listen(port, '0.0.0.0', async () => {
    logger.info(`Server is listening on port: ${port}...`)
    await connectDB()

})
