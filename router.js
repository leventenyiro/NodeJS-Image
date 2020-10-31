const express = require("express")
const router = express.Router()
const controller = require("./controllers/controller")
const FileUpload = require("./models/FileUpload")

router.get("/:id", controller.getImage)

router.post("/", new FileUpload().upload, controller.addImage)

module.exports = router