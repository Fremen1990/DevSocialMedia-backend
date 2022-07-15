import mongoose from 'mongoose'
import logger from './logger'

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {})
        logger.info('Database connected successfully')
    } catch (err) {
        logger.error('Error connecting to mongoDB', err)
        process.exit(1)
    }
}
