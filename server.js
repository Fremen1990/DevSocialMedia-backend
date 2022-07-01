const express = require('express');
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 8000;
const app = express();




app.use(cors({origin:"http://localhost:3000"}))

app.get("/", async (req, res) => {
    res.status(200).send("Works")
})

app.get("/books", async (req, res) => {
    res.status(200).send("books")
})


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})