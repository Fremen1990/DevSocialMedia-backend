import { Request, Response } from 'express'
import logger from '../utils/logger'

export async function homeControllers(req: Request, res: Response) {
    try {
        res.status(200).json({
            message:
                'Welcome to my DevSocialMedia API!! All routes restricted with authorization :)',
        })
    } catch (error: any) {
        logger.error(error)
        return res.status(500).send(error.message)
    }
}
