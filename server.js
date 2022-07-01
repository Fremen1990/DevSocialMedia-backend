const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { readdirSync } = require('fs')
const mongoose = require('mongoose')

app.use(express.json())

// CORS for allowed clients
app.use(cors())
// app.use(cors({origin:"http://localhost:3000"}))

//ROUTES
// mapping through folder routes and adding routes as middleware
readdirSync('./routes').map((route) =>
    app.use('/', require('./routes/' + route))
)

//DATABASE
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Error connecting to mongoDB', err))

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})
