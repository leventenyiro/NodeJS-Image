const express = require("express")
const bodyParser = require("body-parser")
const router = require("./router")
const parameter = require("./parameter.json")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(`/${parameter.fileupload.storage}`, express.static(parameter.fileupload.storage))
app.use("/", router)

app.listen(parameter.app.port, () => {
    console.log(`Running on port ${parameter.app.port}...`)
})