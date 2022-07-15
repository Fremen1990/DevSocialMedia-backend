import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { stringify } from 'querystring'
import connectDB from './utils/connectDB'
import logger from './utils/logger'
import routes from './routes/routes.index'
import config from 'config'

const port = config.get<number>('port')
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

app.listen(port, '0.0.0.0', async () => {
    logger.info(`Server is listening on port: ${port}...`)
    await connectDB()
    routes(app)
})
