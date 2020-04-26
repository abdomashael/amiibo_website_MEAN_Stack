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
        //to load data from https://www.amiiboapi.com/ api to mongo Database
        externalLoad()

    })
    .catch(err => console.log(err))

app.use((req, res,next) => {
    //logger for all requests on server endpoints
    console.log(`${new Date()} ---- ${req.method} ---- ${req.url} `);
    
    next()
})

app.use("/api",APIRouter)

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Listen on ${PORT}`)
    }
})