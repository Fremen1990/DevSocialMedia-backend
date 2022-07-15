import homeRoutes from './home.routes'
import userRoutes from './user.routes'
import postRoutes from './post.routes'
import reactRoutes from './react.routes'
import uploadRoutes from './upload.routes'

export default function routes(app) {
    homeRoutes(app)
    userRoutes(app)
    postRoutes(app)
    reactRoutes(app)
    uploadRoutes(app)
}
