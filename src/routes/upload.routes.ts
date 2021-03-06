import { Express } from 'express'
import { authUser } from '../middlewares/auth.middleware'
import { imageUpload } from '../middlewares/imageUpload.middleware'
import { listImages, uploadImages } from '../controllers/upload.controllers'

export default function uploadRoutes(app: Express) {
    app.post('/api/uploadImages', authUser, imageUpload, uploadImages)
    app.post(
        '/api/listImages',
        // authUser,
        listImages
    )
}
