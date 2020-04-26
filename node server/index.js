const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const {
    load: externalLoad
} = require('./helpers/external_api')

const APIRouter = require("./routes/amiiboa")
const app = express()

const PORT = 3000


app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/amiiboa", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("db is Conncted")
        //externalLoad()

    })
    .catch(err => console.log(err))

app.use((req, res,next) => {
    console.log(`${new Date()} ---- ${req.method} ---- ${req.url} `);
    
    next()
})

app.use("/api",APIRouter)

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Listen on ${PORT}`)
    }
})