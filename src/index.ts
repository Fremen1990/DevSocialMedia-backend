import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import { stringify } from 'querystring'
import connectDB from './utils/connectDB'
import logger from './utils/logger'
import routes from './routes/routes.index'

const port = process.env.PORT || 8800
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }))

// @ts-ignore
app.listen(port, '0.0.0.0', async () => {
    logger.info(`Server is listening on port: ${port}...`)
    await connectDB()
    routes(app)
})
