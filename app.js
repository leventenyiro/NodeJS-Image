const express = require("express")
const bodyParser = require("body-parser")
const router = require("./router")
const parameter = require("./parameter.json")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/", router)

app.listen(parameter.app.port, () => {
    console.log("Running...")
})