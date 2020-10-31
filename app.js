const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

// multer
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    limits: {
        fileSize: 15000000
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)

        if (!mimetype && !extname)
            cb(null, false)
        else
            cb(null, true)
    },
    storage: storage
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use("/images", express.static("images"))

app.post("/", upload.single("image"), (req, res) => {
    console.log(req.file)
    if (req.file == undefined)
        res.send("Error")
    else
        res.send("Successful")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/images/table.png")
})

app.listen(8080, () => {
    console.log("Running...")
})