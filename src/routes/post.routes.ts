import { Express } from 'express'

import { authUser } from '../middlewares/auth.middleware'
import {
    comment,
    createPost,
    deletePost,
    getAllPosts,
    savePost,
} from '../controllers/post.controllers'

export default function postRoutes(app: Express) {
    app.post('/api/createPost', authUser, createPost)
    app.get('/api/getAllPosts', authUser, getAllPosts)
    app.put('/api/comment', authUser, comment)
    app.put('/api/savePost/:id', authUser, savePost)
    app.delete('/api/deletePost/:id', authUser, deletePost)
}
