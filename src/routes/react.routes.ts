import { Express } from 'express'

import { authUser } from '../middlewares/auth.middleware'
import { getReacts, reactPost } from '../controllers/react.controllers'

export default function reactRoutes(app: Express) {
    app.put('/api/reactPost', authUser, reactPost)
    app.get('/api/getReacts/:id', authUser, getReacts)
}
