import express from "express";
import cors from "cors";
import fileUpload from 'express-fileupload'
import routes from "../routes/routes.index";

function createServer() {

    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(fileUpload({useTempFiles: true}))
    routes(app)
    return app;

}

export default createServer;