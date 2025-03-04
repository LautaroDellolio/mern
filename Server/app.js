const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const {API_VERSION} = require("./constants")

const app = express()

//import routing
const authRoutes = require("./router/auth")
const userRoutes = require("./router/user")

//configure Body Parse
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Configure static folder
app.use(express.static("upload"))

//configure header HTTP  - cors
app.use(cors())


//configure routings...
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)

module.exports = app
