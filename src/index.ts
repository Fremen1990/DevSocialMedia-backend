import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import mongoose from 'mongoose'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import postRoutes from './routes/post.routes'
import reactRoutes from './routes/react.routes'
import uploadRoutes from './routes/upload.routes'
const app = express()

app.use(express.json())

// CORS for allowed clients
app.use(cors())

app.use(fileUpload({ useTempFiles: true }))

//ROUTES
app.get('/api', async (req, res) => {
    res.status(200).json({
        message:
            'Welcome to my DevSocialMedia API!! All routes restricted with authorization :)',
    })
})

// new method
postRoutes(app)
userRoutes(app)
reactRoutes(app)
uploadRoutes(app)

//DATABASE
mongoose
    .connect(process.env.DATABASE_URL, {
        // @ts-ignore
        useNewUrlParser: true,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Error connecting to mongoDB', err))

const port = process.env.PORT || 8800
// @ts-ignore
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port: ${port}...`)
})
