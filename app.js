const express = require("express")
const bodyParser = require("body-parser")
const router = require("./router")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/", router)

app.listen(8080, () => {
    console.log("Running...")
})