import mongoose from 'mongoose'
import logger from './logger'
import config from 'config'

export default async function connectDB() {
    const database_url = config.get<string>('database_url')
    try {
        await mongoose.connect(database_url)
        logger.info('Database connected successfully')
    } catch (err) {
        logger.error('Error connecting to mongoDB', err)
        process.exit(1)
    }
}
