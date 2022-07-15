import { Express } from 'express'
import { homeControllers } from '../controllers/home.controllers'

export default function homeRoutes(app: Express) {
    app.get('/api', homeControllers)
}
